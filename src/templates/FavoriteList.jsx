import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import List from '@material-ui/core/List'
import { getProductsInFavorite } from '../reducks/users/selectors'
import { GreyButton, PrimaryButton } from '../components/UIkit'
import { push } from 'connected-react-router';
import {FavoriteListItem} from '../components/Products';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
    }
})

const FavoriteList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const favoriteProducts = getProductsInFavorite(selector)

    const goToOrder = useCallback(() => {
        dispatch(push('/order/confirm'))
    }, [])

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    }, [])
    console.log(favoriteProducts)

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                お気に入り
            </h2>
            <List className={classes.root}> 
                {favoriteProducts.length > 0 && (
                    favoriteProducts.map(product => <FavoriteListItem key={product.favoriteId} product={product} />)
                )}
            </List>
            <div className="module-spacer--mudium" />
            <div className="p-grid__column">
                <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
                <div className="module-spacer--extra-extra-small" />
                <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
            </div>
        </section>
    )
}

export default FavoriteList;