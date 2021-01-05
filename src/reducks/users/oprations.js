import {signInAction} from './actions'
import {push} from 'connected-react-router';
import { auth, db, firebaseTimeStamp } from '../../firebase/index'

// redux-thunkの文法
export const signIn = (email, password) => {
    return async (dispatch) => {
        if(email === "" || password === "") {
            alert("必須項目が未入力です")
            return false
        }
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