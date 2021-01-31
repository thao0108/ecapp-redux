import * as Action from './actions'; //action ファイル内のモジュールをすべてimport
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Action.SIGN_IN:
            // 重複しているプロパティはマージされる スプレッド構文の特製
            // console.log({...state, ...payload})
            return {
                ...state,
                ...action.payload
            }
            case Action.SIGN_OUT:
                return {
                    ...action.payload
                }
            case Action.FETCH_PRODUCTS_IN_CART: 
                return {
                ...state,
                cart: [...action.payload]    
            }
            case Action.FETCH_ORDERS_HISTORY: 
            return {
            ...state,
            orders: [...action.payload]    
        }
        default: 
            return state    
    }
}