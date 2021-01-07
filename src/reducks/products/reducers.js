import * as Action from './actions'; //action ファイル内のモジュールをすべてimport
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
    switch (action.type) {

        default: 
            return state    
    }
}