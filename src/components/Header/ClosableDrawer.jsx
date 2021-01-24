import React, {useState, useCallback} from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/History'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { TextInput } from '../../components/UIkit'
import { signOut } from '../../reducks/users/oprations'

const useStyles = makeStyles((theme) => ({
 drawer: {
     [theme.breakpoints.up('sm')]:{
         flexShrink: 0,
         width: 256,
       } 
     },
     toolbar: theme.mixins.toolbar,
     drawerPaper: {
         width: 256
     },
     searchFeild: {
         alingItem: 'conter',
         display: 'flex',
         margin: 32
     }
 
}))

const ClosableDrawer = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {container} = props
    const [keyword, setKeyword] = useState("")
    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    }, [setKeyword])

    // menuのvalueが渡ってくる
    const selectMenu = (e, path) => {
        dispatch(push(path))
        // メニュー選択後、閉じる
        props.onClose(e)
    }
    // Listの中でmapで回す
    const menus = [
        { func: selectMenu, label: "商品登録", icon: <AddCircleIcon />, id: "regster", value: "/product/edit" },
        { func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/order/history" },
        { func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/value/mypage" },
    ]


    return (
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
            <div>
                <div className={classes.searchFeild}>
                    <TextInput
                        fullWidth={false} label={"キーワードを入力"} multiline={false}
                        onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menus.map(menu => (
                        <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                            <ListItemIcon>
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText primary={menu.label} />
                        </ListItem>
                    ))}
                    <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} />
                    </ListItem>    
                </List>
            </div>
            </Drawer>
        </nav>
    )
 
}
export default ClosableDrawer