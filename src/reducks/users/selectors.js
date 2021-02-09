import { createSelector } from 'reselect';

// useSelectorにより現在のstateの情報が引数として渡される
const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)
export const getProductsInCart = createSelector(
    [usersSelector],
    state => state.cart
)
export const getProductsInFavorite = createSelector(
    [usersSelector],
    state => state.favorite
)
export const getOrdersHistory = createSelector(
    [usersSelector],
    state => state.orders
)

// 現在のstateのuidを返す　stateが変更された時実行される
export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)
export const getUsername = createSelector(
    [usersSelector],
    state => state.username
)
