import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavariteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'

const HeaderMenu = (props) => {
    return (
        <>
            <IconButton>
                <Badge badgeContent={3} color="secondary">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
            <IconButton>
                <FavariteBorderIcon/>
            </IconButton>
            {/* サインインしてMenuIconが押された時にdrawerが開く */}
            <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
                <MenuIcon/>
            </IconButton>
        </>
    )
}
export default HeaderMenu;