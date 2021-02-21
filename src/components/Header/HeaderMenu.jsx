import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'
import { getProductsInCart, getUserId, getProductsInFavorite } from '../../reducks/users/selectors'
import { fetchProductsInCart, fetchProductsInFavorite } from '../../reducks/users/oprations'
import { db } from '../../firebase'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    icon: {
        color: '#fff'
    }
})

const HeaderMenu = (props) => {
    const classes = useStyles()
    const selector = useSelector(state => state)
    const dispatch = useDispatch()
    const uid = getUserId(selector)

    // cartの中身は処理によって変化する
    let productsInCart = getProductsInCart(selector)
    let favoriteProducts = getProductsInFavorite(selector)
    console.log(favoriteProducts)

    // firebaseがカートの商品状況をリッスンしている　
    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('cart')
            .onSnapshot(snapshots => {
                // 複数ドキュメントの変更タイプ取得　cartの中が削除、追加、変更によって処理を変更 
                snapshots.docChanges().forEach(change => {
                    //フィールド情報取得
                    const product = change.doc.data();
                    const changeType = change.type

                    switch (changeType) {
                        case 'added' : 
                            productsInCart.push(product)
                            break;
                        case 'modified':
                            // 変更が加わった要素を特定 条件満たす値を返す
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id) 
                            // 変更が加わった要素をproductで上書き 
                            productsInCart[index] = product
                            break;
                        case 'removed': 
                            // 削除されたものを取り除いて新しい配列を作る
                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)  
                        default:
                            break;        
                    }

                })
                // Reduxのカートの情報を現在のカートの情報に更新する
                dispatch(fetchProductsInCart(productsInCart))    
            })
            return () => unsubscribe()
    },[])

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('favorite')
            .onSnapshot(snapshots => {
                // 複数ドキュメントの変更タイプ取得　favoriteの中が削除、追加、変更によって処理を変更 
                snapshots.docChanges().forEach(change => {
                    //フィールド情報取得
                    // changeは変更が加わったドキュメント情報
                    const product = change.doc.data();
                    const changeType = change.type

                    switch (changeType) {
                        case 'added' : 
                            favoriteProducts.push(product)
                            break;
                        case 'modified':
                            // 変更が加わった要素を特定 条件満たす値を返す
                            const index = favoriteProducts.findIndex(product => product.favoriteId === change.doc.id) 
                            // 変更が加わった要素をproductで上書き 
                            favoriteProducts[index] = product
                            break;
                        case 'removed': 
                            // 削除されたものを取り除いて新しい配列を作る
                            favoriteProducts = favoriteProducts.filter(product => product.favoriteId !== change.doc.id)  
                        default:
                            break;        
                    }

                })
                // Reduxのカートの情報を現在のカートの情報に更新する
                dispatch(fetchProductsInFavorite(favoriteProducts))    
            })
            return () => unsubscribe()
    },[])
    
    return (
        <>
            <IconButton onClick={() => dispatch(push('/cart'))} className={classes.icon}>
            {/* cartの配列の要素の数 */}
                <Badge badgeContent={productsInCart.length} color="secondary">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
            <IconButton onClick={() => dispatch(push('/favorite'))} className={classes.icon}>
                <FavoriteBorderIcon/>
            </IconButton>
            {/* サインインしてMenuIconが押された時にdrawerが開く */}
            <IconButton onClick={(e) => props.handleDrawerToggle(e)} className={classes.icon}>
                <MenuIcon/>
            </IconButton>
        </>
    )
}
export default HeaderMenu;