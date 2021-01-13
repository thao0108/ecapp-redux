import { createSelector } from 'reselect'

export const productSelector = (state) => state.products

export const getProducts = createSelector(
    [productSelector],
    state => state.list
)