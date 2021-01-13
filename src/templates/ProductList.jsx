import React, { useEffect } from 'react' 
import { ProductCard } from '../components/Products'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../reducks/products/selectors'
import { fetchProduct } from '../reducks/products/operations'

const ProductList = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const products = getProducts(selector)
    console.log(products)

    useEffect(() => {
        // fetchProductで各ドキュメントを取り出す
        dispatch(fetchProduct())
    }, [])

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