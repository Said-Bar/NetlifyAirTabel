import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'


const initialState = {
  isSidebarOpen:false
}


const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {



  return (
    <ProductsContext.Provider value={{
      ...state,
      openSidebar,
      closeSidebar}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
