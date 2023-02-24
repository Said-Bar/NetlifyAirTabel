import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import { useFetchProductsQuery, setProductLength} from '../store'
import {useSelector, useDispatch} from 'react-redux';
import Error from './Error'
import Loading from './Loading'
import { useMemo } from 'react';



const ProductList = () => {
  const {data: products = [],  error, isLoading} = useFetchProductsQuery();
  const dispatch = useDispatch();

  const {grid_view, sort,  
    filters: {text,  category,  company,   color,   price,  shipping}} = useSelector((state) => {
    return state.product;
  })



  const sorted_products = useMemo(() => {
    const sorted_products = products.slice();
    if (sort === 'name-a') {
    sorted_products.sort((a, b) => a.name.localeCompare(b.name))
      return sorted_products
    }
    if (sort === 'name-z') {
      sorted_products.sort((a, b) => b.name.localeCompare(a.name))
        return sorted_products
    }
    if (sort === 'price-lowest') {
      sorted_products.sort((a, b) => a.price - b.price)
        return sorted_products
      }
    if (sort === 'price-highest') {
      sorted_products.sort((a, b) => b.price - a.price)
        return sorted_products
    }

    return sorted_products
  }, [products, sort])


  const filtered_products = useMemo(() => {
    let filtered_products = [...sorted_products]
    if (text) {
      filtered_products = filtered_products.filter((product) =>
        product.name.toLowerCase().startsWith(text)
      )
    }
    if (category !== 'all') {
      filtered_products = filtered_products.filter(
        (product) => product.category === category
      )
    }
    if (company !== 'all') {
      filtered_products = filtered_products.filter(
        (product) => product.company === company
      )
    }
    if (color !== 'all') {
      filtered_products = filtered_products.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }
    // filter by price
    filtered_products = filtered_products.filter((product) => product.price <= price)
    // filter by shipping
    if (shipping) {
      filtered_products = filtered_products.filter((product) => product.shipping === true)
    }

    return filtered_products
  }, [text,  category,  company,   color,   price,  shipping, sorted_products])

  dispatch(setProductLength(filtered_products.length))


  if (isLoading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  
  if (filtered_products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }



  if (grid_view === false) {
    return <ListView products={filtered_products} />
  }
  return <GridView products={filtered_products} />
}

export default ProductList
