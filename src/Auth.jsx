import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listenAuthState } from './reducks/users/oprations';
import { getIsSignedIn } from './reducks/users/selectors'

// サインイン後のページ遷移の時に呼び出す
const Auth = ({children}) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const isSignedIn = getIsSignedIn(selector);

    // Authが呼び出された時useEffectを通り越して下が実行される
    useEffect(() => {
        // 　reduxのstoreのstateから　サインインしているか判断
        if(!isSignedIn) {
            dispatch(listenAuthState())
        }
    }, [])
// redux state の　isSignInが判断
    if(!isSignedIn) {
        // 空のjsx
        return <></>
    } else {
        // サインインしていれば小要素(Routeのコンポーネント)を返す
        return children
    }
}
export default Auth