import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { getOrdersHistory } from '../reducks/users/selectors';
import { fetchOrderHistory } from '../reducks/users/oprations';

const useStyles = makeStyles((theme) => ({
    orderList: {
        backGround: ThemeProvider.palette.grey["100"],
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
    const selector = useSelector((state) => state)
    const orders = getOrdersHistory(selector)

    // レンダー後にfetchOrdersHistoryを呼び出しordersを取得
    useEffect(() => {
        dispatch(fetchOrderHistory())
    }, [])

    return(
        <section className="c-section-wrapin">
            <Lis className={classes.orderList}>

            </Lis>
        </section>
    )
}

export default OrderHistory