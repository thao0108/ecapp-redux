import React, {useState} from 'react' 
import NoImage from '../../assets/img/src/no_image.png'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

const ImagesSwiper = (props) => {
    // パラメーターとして定義
    const [params] = useState({
        pagination: {
            el: 'swiper-pagination',
            type: 'bullets',            //●を表示
            clickable: true,            //●をクリックできる
            dynamicBullets: true       //表示している●が大きくなる
        },
        navigation: {
            nextEl: 'swiper-button-next',
            prevEl: 'swiper-button-prev'
        },
        loop: true,
        spaceBetween: 30
    })

    const images = props.images

    return (
        <Swiper {...params}>
            {images.length === 0 ? (
                <div className="p-media__thumb">
                    <img src={NoImage} alt="no image"/>
                </div>
            ) : (
                images.map(image => (
                <div className="p-media__thumb" key={image.id}>
                    <img src={image.path} alt="商品画像"/>
                </div>
                ))
            )}
        </Swiper>

    )
}
export default ImagesSwiper
