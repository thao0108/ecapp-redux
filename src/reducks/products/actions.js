export const DELETE_PRODUCTS = "DELETE_PRODUCTS"
export const deleteProductAction = (products) => {
    return {
        type: "DELETE_PRODUCTS",
        payload: products
    }
};

export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const fetchProductsAction = (products) => {
    return {
        type: "FETCH_PRODUCTS",
        payload: products
    }
};

export const SEARCH_KEYWORD = "SEARCH_KEYWORD"
export const searchKeywordAction = (products) => {
    return {
        type: "SEARCH_KEYWORD",
        payload: products
    }
};

