import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

// Import reducer

import { UsersReducer } from '../users/reducers';

export default function createStore(history) { 
    return reduxCreateStore(
        // combineReducersはオブジェクトを返す{}(state)
        // createStore(redux)はreducerを引数にとる
        // createStore(reducer or combineReducer)　
        combineReducers({
            // historyをrouterとしてstateで管理
            router: connectRouter(history),
            users: UsersReducer
        }),
        applyMiddleware(
            routerMiddleware(history)
        )
    )
}