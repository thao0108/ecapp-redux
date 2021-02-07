import React, { useEffect } from 'react' 
import { ProductCard } from '../components/Products'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../reducks/products/selectors'
import { fetchProduct } from '../reducks/products/operations'

const ProductList = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const products = getProducts(selector)

    // 現在のURLを取得
    const query = selector.router.location.search
    // queryの先頭が?genderで始まるかtestしている　true → ?genderの後の値を取り出す
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

    // queryが変更される度fetchProductで各ドキュメントを取り出す
    // queryで取得した結果を渡す
    useEffect(() => {
        dispatch(fetchProduct(gender, category))
    }, [query])

    return(
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {products.length > 0 && (
                    products.map(product => (
                        <ProductCard key={product.id} id={product.id} price={product.price} name={product.name} images={product.images}/>
                    ))
                )}
            </div>
        </section>
    )
}
export default ProductList;