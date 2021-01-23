import React, {useState, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import { makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar} from '@material-ui/core'
import logo from '../../assets/img/icons/logo.png'
import { getIsSignedIn } from '../../reducks/users/selectors'
import { push } from 'connected-react-router'
import { HeaderMenu, ClosableDrawer } from './index'

 const useStyles = makeStyles({
        root: {
            flexGrow: 1,
        },
        menuBar: {
            backgroundColor: "#fff",
            color: "#444"
        },
        toolBar: {
            margin: '0 auto',
            maxWidth: '1024',
            width: '100%'
        },
        iconButtons: {
            margin: '0 0 0 auto'
        }
})

const Header = () => {
    const classes = useStyles()
    const selector = useSelector(state => state)
    const isSignedIn = getIsSignedIn(selector)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const handleDrawerToggle = useCallback((e) => {
        // キーボード入力かつ、タブかシフトだったらそのまま返す
        if(e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setOpen(!open)
    },[setOpen, open])

    return(
        <div className={classes.root}>
            <AppBar position="fiexed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <img 
                        src={logo} alt="Torahack logo" width="120px"
                        onClick={() => dispatch(push('/'))}
                    />
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenu handleDrawerToggle={handleDrawerToggle}/>
                        </div>
                    )}
                </ Toolbar> 
            </ AppBar>
            {/* 初期はfalse closeする時はsetOpenがfalseになる時  HeaderMenuのMenuIconが押されたらtrueになる*/}
            <ClosableDrawer open={open} onClose={handleDrawerToggle}/>
        </div>
    )
}
export default Header;