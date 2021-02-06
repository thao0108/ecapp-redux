import { firebaseTimeStamp, db } from "../../firebase/index"
import { push } from 'connected-react-router'
import { fetchProductsAction, deleteProductAction } from './actions'

const productsRef = db.collection('products')

export const deleteProduct = id => {
    return async(dispatch, getState) => {
        // ドキュメントを消す
        productsRef.doc(id).delete()
            .then(() => {
                // stateを更新
                const prevProducts = getState().products.list;
                const nextProducts = prevProducts.filter(product => product.id !== id)
                // actionに変更内容を渡す
                dispatch(deleteProductAction(nextProducts))
            })
    }
}

// 各商品を取り出す
export const fetchProduct = (gender, category) => {
    return async(dispatch) => {
        // orderBy(更新日付, 昇順)　各ドキュメントをを取り出す
        let query = productsRef.orderBy('updated_at', 'desc')
        // where条件文　queryが空じゃなければ　引数と一致するものをqueryに代入(ドキュメントを絞る)
        query = (gender !== "" ) ? query.where('gender', '==', gender) : query;
        query = (category !== "" ) ? query.where('category', '==', category) : query;

        query.get()
            .then(snapshots => {
                const productList = []
                // ドキュメントオブジェクトを取り出して配列に格納
                snapshots.forEach(snapshot => {
                    // ドキュメントを一つずつ呼び出し、ドキュメントの中のデータを取得
                    const product = snapshot.data()
                    productList.push(product)
                })

                // アクションを呼び出す
                dispatch(fetchProductsAction(productList))
            })
    }
}

export const orderProduct = (productsInCart, amount) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid)
        const timestamp = firebaseTimeStamp.now()

        let products = [],
            soldOutProducts = [];

        const batch = db.batch()
        
        for(const product of productsInCart) {
            // カート内の商品情報productIdをdoc()に指定して各商品情報を呼び出す
            const snapshot = await productsRef.doc(product.productId).get()
            // productコレクションのサイズ
            const sizes = snapshot.data().sizes

            // productコレクションのサイズをマップでイテレート
            const updatedSizes = sizes.map(size => {
                // productコレクションのサイズとカート内の商品カート
                if(size.size === product.size) {
                    // 商品が売り切れだった場合
                   if (size.quantity ===　0) {
                    // 下でalert処理   
                    soldOutProducts.push(product.name)
                    // そのままサイズオブジェクトを返す
                    return size
                   }
                　　//通常の処理    
                   return {
                       size: size.size,
                       //productコレクションのサイズの数量を−１   
                       quantity: size.quantity - 1
                   }
                // 選んだサイズじゃなければ元のサイズオブジェクトを返す   
                } else {
                    return size
                }
            })
            // 注文履歴用 historyオブジェクト
            products.push({
                id: product.productId,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size
            })

            batch.update(
                productsRef.doc(product.productId),
                    {sizes: updatedSizes}     //商品を購入し、在庫を減らした後商品を上書き            
            )
        　　 // カート内削除
            batch.delete(
                userRef.collection('cart').doc(product.cartId)
            )
        }
        // for文ここまで

        // 在庫切れの商品があれば
        if (soldOutProducts.length > 0) {
            const errorMessage = (soldOutProducts.length > 1) ? 
                                  soldOutProducts.join('と') : 
                                  soldOutProducts[0]
            alert('大変申し訳ありません' + errorMessage + '在庫切れとなったため、注文処理を中断しました。')   
            return false
    　　 // 在庫があれば
        } else {
            // batch処理を実行
            batch.commit()
                .then(() => {
                    // orderサブコレクション
                    const orderRef = userRef.collection('orders').doc()
                    // 今日の日付
                    const date = timestamp.toDate()
                    // 配送日
                    const shippingDate = firebaseTimeStamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

                    const history = {
                        amount: amount,
                        created_at: timestamp,
                        id: orderRef.id,
                        products: products,
                        shipping_date: shippingDate,
                        updated_at: timestamp
                    }

                    orderRef.set(history)
                    dispatch(push('/order/complete'))
        　　　   //エラーになるとcommitは実行されない 
                }).catch((err) => {
                    alert('注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。')
                    console.log(err)
                    return false
                })

            

        }
    }
}




// 商品データを登録
// idが渡ってくるときは商品を編集するとき
export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
    return async (dispatch) => {
        const timestamp = firebaseTimeStamp.now()

        // データ作成
        const data = {
            category: category,
            description: description,
            gender: gender,
            name: name,
            price: parseInt(price, 10), //10進数
            images: images,
            sizes: sizes,
            updated_at: timestamp
        }

        // idがなければ（新規登録時）
        if(id === "") {
            const ref = productsRef.doc();
            // idを自動採番
            id = ref.id
            // プロパティにidを追加
            data.id = id
            data.created_at = timestamp
        }

        //  merge: true で編集部分だけ上書き
        return productsRef.doc(id).set(data, {merge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })

    }
}