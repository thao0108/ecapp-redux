// storeの初期状態
const initialState = {
    products: {
        list: []
    },
    users: {
        cart: [],
        orders: [],
        isSignedIn: false,
        role: "",
        uid: "",
        username: ""
    }
}
export default initialState