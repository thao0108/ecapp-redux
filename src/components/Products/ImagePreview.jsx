import React from 'react'

const ImagePreview = (props) => {
    return(
        // id は image.id
        <div className="p-media__thumb"　onClick={() => props.delete(props.id)}>
            <img alt="プレビュー画像"　src={props.path} />
        </div>
    )
}

export default ImagePreview