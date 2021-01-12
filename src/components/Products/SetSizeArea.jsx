import React, { useState, useCallback, useEffect } from 'react'
import 
    { TableContainer, 
      Paper, 
      Table, 
      TableBody, 
      TableCell, 
      TableHead, 
      TableRow,
      IconButton, 
    } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle' 
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/styles'   
import { TextInput } from '../UIkit'

const useStyles = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        height: 48,
        width: 48
    }
})

const SetSizesArea = (props) => {
    const classes = useStyles()

    const [index, setIndex] = useState(0),
          [size, setSize] = useState(""),
          [quantity, setQuantity] = useState(0);

    const inputSize = useCallback((event) => {
        setSize(event.target.value)
    }, [setSize]);

    const inputQuantity = useCallback((event) => {
        setQuantity(event.target.value)
    }, [setQuantity]);

    //　CheckCircleIconが押された後の処理 ローカルのindexかmapのindexかで条件分岐
    const addSize = (index, size, quantity) => {
        // バリテーション
        if (size === "" || quantity === 0) {
            // Required input is blank
            return false
        } else {
            // ローカルのindexとlengthが等しい　新規追加
            if (index === props.sizes.length) {
                // 前回のstateを使って上書き　入力決定後の更新された値
                props.setSizes(prevState => [...prevState, {size: size, quantity: quantity}]);
                // 入力フォームの値
                setIndex(index + 1);
                setSize("");
                setQuantity(0)
            } else {  //　editIconが押された後による追加だった場合　
                // 全てのしサイズと数量をnewSizesに格納
                const newSizes = props.sizes;
                // editIconで押されたサイズを指定　引数で渡ってきたsizeとquantityを使って更新
                newSizes[index] = {size: size, quantity: quantity};

                props.setSizes(newSizes);
                setIndex(newSizes.length);
                setSize("");
                setQuantity(0);
            }
        }
    }
    // 登録された値が引数に渡ってくる　useStateを更新してTextInputのvalueが変更される　indexはmapで回しているindex
    const editSize = (index, size, quantity) => {
        setIndex(index)
        setSize(size)
        setQuantity(quantity)
    }

    //　mapで回している中のindexが渡ってくる
    const deleteSize = (deleteIndex) => {
        const newSizes = props.sizes.filter((item, index) => index !== deleteIndex)
        props.setSizes(newSizes);
    }

    // 常に新しいindexからはじめるため
    useEffect(() => {
        setIndex(props.sizes.length)
    },[props.sizes.length])

    console.log(props.sizes)
    console.log(index)

    return (
        <div aria-label="サイズ展開">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.sizes.length > 0 && (
                            props.sizes.map((item, index) => (
                                <TableRow key={item.size}>
                                    <TableCell component="th" scope="row">{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => editSize(index, item.size, item.quantity)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => deleteSize(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={"サイズ"} multiline={false} required={true}
                        onChange={inputSize} rows={1} value={size} type={"text"}
                    />
                    <TextInput
                        fullWidth={false} label={"数量"} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} value={quantity} type={"number"}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
            <div className="module-spacer--small"/>
        </div>
    );
};

export default SetSizesArea;
