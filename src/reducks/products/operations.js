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
export const fetchProduct = () => {
    return async(dispatch) => {
        // orderBy(更新日付, 昇順)　各ドキュメントをを取り出す
        productsRef.orderBy('updated_at', 'desc').get()
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