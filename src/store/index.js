import { configureStore } from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {productApi} from './apis/productApi';
import { openSidebar, closeSidebar, 
        setGridView, setListView,
        updateSort,
        setProductLength,
        UpdateFilters, setInitialPrice, clearFilter,
        productReducer} from './slices/productsSlice';
import {addToCart, clearCart, removeCartItem, toggleAmount,
        cartReducer} from './slices/cartSlice';



const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(productApi.middleware);
    }
})

setupListeners(store.dispatch);


export {
    store,

    openSidebar, closeSidebar,
    setGridView, setListView,
    setProductLength, setInitialPrice, 
    clearFilter, UpdateFilters, updateSort,
    
    addToCart, clearCart, removeCartItem, toggleAmount,
}

export {useFetchProductsQuery, useFetchProductQuery, useFetchFeaturedProductsQuery} from './apis/productApi';
