import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCard'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/MenuIcon'

const HeaderMenu = () => {
    return (
        <>
            <IconButton>
                <Badge badgeContent={3} color="secondary">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
            <IconButton>
                <FavariteBoderIcon/>
            </IconButton>
            <IconButton>
                <MenuIcon/>
            </IconButton>
        </>
    )
}
export default HeaderMenu;