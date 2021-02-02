import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles';
import { getOrdersHistory } from '../reducks/users/selectors';
import { fetchOrderHistory } from '../reducks/users/oprations';
import OrderHistoryItem from '../components/Products/OrderHistoryItem';


const useStyles = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('md')]: {
            width:'100%'
        },
        [theme.breakpoints.up('md')]: {
            width: 768
        }
    }
}));


const OrderHistory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const orders = getOrdersHistory(selector)

    // レンダー後にfetchOrdersHistoryを呼び出しordersを取得
    useEffect(() => {
        dispatch(fetchOrderHistory())
    }, [])

    return(
        <section className="c-section-wrapin">
            <List className={classes.orderList}>
                {orders.length > 0 && (
                    orders.map(order => <OrderHistoryItem order={order} key={order.id} />)
                )}
            </List>
        </section>
    )
}

export default OrderHistory