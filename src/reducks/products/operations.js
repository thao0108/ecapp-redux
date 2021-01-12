import { firebaseTimeStamp, db } from "../../firebase/index"
import { push } from 'connected-react-router'

const productsRef = db.collection('products')

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
        if(id === "" ) {
            const ref = productsRef.doc();
            // idを自動採番
            const id = ref.id
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