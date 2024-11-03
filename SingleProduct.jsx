import React, {useEffect} from 'react'

import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { fetchProduct } from '../redux/actions/productActions';
import Loader from './../layouts/Loader';
import ProductDetails from './../layouts/ProductDetails';
import { addCommas, saleCalc, dollar_Conv } from '../functions/func';
import SinglePageTitle from '../layouts/SinglePageTitle';


const SingleProduct = () => {
    const {id} = useParams();   
    const dispatch = useDispatch();
    const { loading, error, product, reviewed } = useSelector((state) => state.product);

    useEffect(() => {
      dispatch(fetchProduct(id));
    }, [dispatch]);  

    console.log(product)

    const price =  product && product.price;
    const discount = product && product.discount;
    const onSale = product && product.onSale;
    const salePrice = addCommas(
      saleCalc(price, onSale, discount)
      )
    const dollarSale = saleCalc(price, onSale, discount)
        
    

    const productList = {
      images: product && product.images,
      title: product && product.title,
      brand: product && product.brand,
      rating: product && product.rating,
      reviews: product && product.numOfReviews,
      price: addCommas(price),
      salePrice: salePrice,
      dollar: dollar_Conv(price),
      dollarSale: dollar_Conv(dollarSale),
      sold: product && product.sold,
      productIsNew: product && product.productIsNew,
      onSale: product && product.onSale,
      discount: discount,
      subtitle: product && product.subTitle,
      inStock: product && product.stock,
      stock: product && product.stock,
      category: product && product.category,
      fullDetails: product && product.description,
      comments: [
        { user: 'Bilal', rating: 5, text: 'Great product!' , time: "2 days ago" },
        { user: 'Tabish', rating: 4, text: 'Very good, but could be improved.', time: "10 days ago" },
        { user: 'Iqbal', rating: 2, text: 'Not Satisfied at all.', time: "few hours ago" },
      ],
    };
    

  return (

    <div className=''>
      <SinglePageTitle title={product && product.title} />
         {  loading ? <Loader /> : product && <ProductDetails product={productList} />}
   </div>
  )
}

export default SingleProduct
