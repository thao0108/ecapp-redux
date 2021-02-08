import React from 'react';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
})

const SizeTable = (props) => {
    const classes = useStyles()

    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableBody>
                    {props.sizes.length > 0 && (
                        props.sizes.map((size, index) => (
                            <TableRow key={size.size}>
                                <TableCell component="th" scope="row">{size.size}</TableCell>
                                <TableCell>
                                    残り{size.quantity}点
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    {size.quantity > 0 ? (
                                        <IconButton
                                            className={classes.iconCell}
                                            onClick={() => props.addProduct(size.size)} //addProductにクリックされたサイズが渡される
                                        >
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : (
                                        <div>売切</div>
                                    )}
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    <IconButton 
                                        className={classes.iconCell}
                                        onClick={() => props.favoriteProduct(size.size)} //favoriteProductにクリックされたサイズが渡される
                                    >
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SizeTable;