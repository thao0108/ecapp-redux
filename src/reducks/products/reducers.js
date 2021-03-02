import * as Actions from './actions'; //action ファイル内のモジュールをすべてimport
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case Actions.DELETE_PRODUCTS: 
        return {
            ...state,
            list: [...action.payload] //reduxのstoreの中のメモリ情報が書き換わる　コンポーネント側で変更が検知される
        }
        case Actions.FETCH_PRODUCTS: 
        return {
            ...state,
            list: [...action.payload] //reduxのstoreの中のメモリ情報が書き換わる　コンポーネント側で変更が検知される
        }
        case Actions.SEARCH_KEYWORD: 
        return {
            ...state,
            list: [...action.payload] //reduxのstoreの中のメモリ情報が書き換わる　コンポーネント側で変更が検知される
        }
        default: 
            return state    
    }
}