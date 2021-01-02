export const SIGN_IN = "SIGN_IN";
// Actionはプレーンなオブジェクトを返す
// 非同期処理はなし
export const signInAction = (userState) => {
        return {
            type: "SIGN_IN",
            payload: {
                isSignedIn: true,  //サインインしているかどうか
                uid: userState.uid,
                username: userState.username
            
            }
    }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            uid: "",
            username: ""
        }
    }
} 