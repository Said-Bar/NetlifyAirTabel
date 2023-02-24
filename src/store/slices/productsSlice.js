import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        isSidebarOpen: false,
        grid_view: true,
        product_length: 0,
        sort: 'price-lowest',
        filters: {
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          min_price: 0,
          max_price: 0,
          price: 100000000,
          shipping: false,
        },
    },
    reducers:{
        openSidebar(state, action){
            state.isSidebarOpen = action.payload;
        },
        closeSidebar(state, action){
            state.isSidebarOpen = action.payload;
        },
        setGridView(state, action){
            state.grid_view = action.payload;
        },
        setListView(state, action){
            state.grid_view = action.payload;
        },
        updateSort(state, action){
            state.sort = action.payload;
        },
        setProductLength(state, action){
            state.product_length = action.payload;
        },
        UpdateFilters(state, action){
            const { name, value } = action.payload
            state.filters =  {...state.filters, [name]: value}
        },
        setInitialPrice(state, action){
            state.filters.price =  action.payload
        },
        clearFilter(state, action){
            state.filters =  {...state.filters,
                text: '',
                company: 'all',
                category: 'all',
                color: 'all',
                price: action.payload,
                shipping: false,
              }
        }
    }
})


export const {openSidebar, closeSidebar, 
                setGridView, setListView,
                updateSort,
                UpdateFilters, 
                setProductLength,  setInitialPrice, clearFilter,
            } = productSlice.actions;
export const productReducer = productSlice.reducer;