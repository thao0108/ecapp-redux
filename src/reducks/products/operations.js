import { firebaseTimeStamp, db } from "../../firebase/index"
import { push } from 'connected-react-router'

const productsRef = db.collection('products')

// 商品データを登録
export const saveProduct = (name, description, category, gender, price, images) => {
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
            updated_at: timestamp
        }
        const ref = productsRef.doc();
        // idを自動採番
        const id = ref.id
        // プロパティにidを追加
        data.id = id
        data.created_at = timestamp

        return productsRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            })

    }
}