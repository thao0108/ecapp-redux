import React, { useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles} from '@material-ui/styles'
import { storage } from '../../firebase/index'
import ImagePreview from '../Products/ImagePreview';

const useStyles = makeStyles({
 icon: {
     height: 48,
     width: 48
 }
})


// 商品画像に関する処理まとめ
const ImageArea = (props) => {
    const classes = useStyles()

    // 画像がクリックされたら
    // 画像削除
    // 関数はImagePreviewに渡されている
    const deleteImage = useCallback( async(id) => {
        // confirmを呼び出す
        const ret = window.confirm('この画像を削除しますか？')
        // キャンセルの場合中断
        if(!ret) {
            return false
        } else {
            // 選択したものと違うIDを残す
            const newImages = props.images.filter(image => image.id !== id)  //idはfileName
            props.setImages(newImages);
            // storageのdelete機能
            return storage.ref('image').child(id).delete()
        }
        // imagesのuseStateを変更するたび
    }, [props.images])

    // 画像アップロード 画像選択後 　登録ボタンおす前
    const uploadImage = useCallback((event) => {
        const file = event.target.files  //このままstorageに保存できない
        let blob = new Blob(file, {type: "image/jpeg"})　//blobオブジェクトに変更
    
        // Generate random digits strings
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N=16
        const fileName = 
        Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n%S.length]).join('') //16桁をランダム生成
    
        const uploadRef = storage.ref('image').child(fileName)
        const upLoadTask = uploadRef.put(blob)
    
        upLoadTask.then(() => {
            // ダウンロードした画像のURLを取得
            upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                // useStateのset関数　ProductEditから渡されるimage, setImageを受け取っている
                // 更新前のstateが使える
                props.setImages((prevState => [...prevState, newImage]))
            })
        })
        
    }, [props.setImages])

    return (
        <div>
            <div className="p-grid__list-image">
             {/* 登録画像情報ををImagePreviewに渡し表示 */}
             {/* imagesは配列*/}
                {props.images.length > 0 && (
                    props.images.map(image => <ImagePreview id={image.id} path={image.path} key={image.id} delete={deleteImage}/>
                ))}
            </div>
            <div className="u-text-right">
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                         <AddPhotoAlternateIcon/>
                         {/* cssでdisplay：noneを指定 */}
                         <input 
                            className="u-display-none" 
                            type="file" 
                            id="image" 
                            onChange={(event) => uploadImage(event)}
                          />
                    </label>
                </IconButton>
            </div>
        </div>
    )
}

export default ImageArea