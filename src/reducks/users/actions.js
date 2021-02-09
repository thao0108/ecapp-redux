export const SIGN_IN = "SIGN_IN";
// Actionはプレーンなオブジェクトを返す
// 非同期処理はなし
export const signInAction = (userState) => {
        return {
            type: "SIGN_IN",
            payload: {
                isSignedIn: true,  //サインインしているかどうか
                role: userState.role,
                uid: userState.uid,
                username: userState.username
            
            }
    }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            role: "",
            uid: "",
            username: ""
        }
    }
} 
export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART"
export const fetchProductsInCartAction = (products) => {
    return {
        type: "FETCH_PRODUCTS_IN_CART",
        payload: products
    }
};

export const FETCH_PRODUCT_IN_FAVORITE = "FETCH_PRODUCT_IN_FAVORITE"
export const fetchProductsInFavoriteAction = (products) => {
    return {
        type: "FETCH_PRODUCT_IN_FAVORITE",
        payload: products
    }
};


export const FETCH_ORDER_HISTORY = "FETCH_ORDER_HISTORY"
export const fetchOrderHistoryAction = (history) => {
    return {
        type: "FETCH_ORDER_HISTORY",
        payload: history
    }
};


