import { signInAction , signOutAction, fetchProductsInCartAction } from './actions'
import {push} from 'connected-react-router';
import { auth, db, firebaseTimeStamp } from '../../firebase/index'


// cartに選択された商品情報を登録
export const addProductToCart = (addedProduct) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid
        // 現在のユーザーの中にサブコレクションcartのドキュメントIDを作成
        const cartRef = db.collection('users').doc(uid).collection('cart').doc()
        addedProduct['cartId'] = cartRef.id
        // cartサブコレクションデータ追加
        await cartRef.set(addedProduct)
        dispatch(push('/'))
    }
}


export const fetchOrderHistory = () => {
    return async(dispatch, getState) => {
        const uid = getState().users.uid;
        const list = []
        db.collection('users').dov(uid)
        .collection('orders')
        .orderBy('update_at','desc')
        .get()
        .then((snapshots) => {
            snapshots.forEach(snapshot => {
                const data = snapshot.data()
                list.push(data)
            })
            dispatch(fetchOrderHistoryAction)
        })
    }
}

// アクションにHeaderMenuからのカートの情報を渡す
export const fetchProductsInCart = (products) => {
    return async(dispatch) => {
        dispatch(fetchProductsInCartAction(products))
    }
}

// 認証リッスン機能
export const listenAuthState = () => {
    return async(dispatch) => {
        return auth.onAuthStateChanged(user=> {
            // サインインしていれば
            if(user) {
                const uid = user.uid
                    // データベースからデータを取得
                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            // データを変数に格納
                            const data = snapshot.data()

                            // Actionを呼び出す state書き換え
                            // dataの中のプロパティをstateで状態維持させアプリ内ですぐ呼び出せるようにする
                            // operation以外で非同期は使わないため
                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))
                        })   
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}
export const resetPassword = (email) => {
    return async(dispatch) => {
        if(email === "") {
            alert("必須項目が未入力")
            return false
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレスにパスワードリセットのメールを送りしました。')
                    dispatch(push('/signin'))
                })
                .catch(() => {
                    alert('パスワードリセットに失敗しました。通信を確認して再度お試しください')
                })
        }
    }
}


// redux-thunkの文法
export const signIn = (email, password) => {
    return async (dispatch) => {
        if(email === "" || password === "") {
            alert("必須項目が未入力です")
            return false
        }
        // 戻り値はPromise 内容:firebase.auth.UserCredentialがresultに格納
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if(user) {
                    const uid = user.uid

                    // データベースからデータを取得
                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            // データを変数に格納
                            const data = snapshot.data()

                            // Actionを呼び出す state書き換え
                            // dataの中のプロパティをstateで状態維持させアプリ内ですぐ呼び出せるようにする
                            // operation以外で非同期は使わないため
                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))
                            dispatch(push('/'))

                        })
                }
            })


    }
}
// Login.jsでonClickの時にSignIn関数を実行させる

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        if(username === "" || email === "" || password === "" || confirmPassword === ""){
            alert("必須項目が未入力です")
            //  中断
            return false
        }
 

        if (password !== confirmPassword) {
            alert("パスワードが一致しません。もう一度お試しください")
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password) 
            .then(result => {
                const user = result.user
                // userがある場合、認証成功している
                if (user) {
                    const uid = user.uid
                    const timestamp = firebaseTimeStamp.now()

                    // userのデータを作る 渡されて来た(入力された)
                    const userInitialDate = {
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    }    

                    // userデータをデータベースに新規登録
                    db.collection('users').doc(uid).set(userInitialDate)
                        .then(() => {
                            // 登録完了後トップベージに移動
                            dispatch(push('/'))
                        })
                    
                }
            })

    }
}
export const signOut = () => {
    return async(dispatch) => {
        auth.signOut()
        .then(() => {
            // actionがstateをリセット
            dispatch(signOutAction())
            dispatch(push('/signin'))
        })
    }
}
// サインアウト後URLでHomeに飛ぼうとしてもAuthが実行されてsignIn画面に飛ぶ