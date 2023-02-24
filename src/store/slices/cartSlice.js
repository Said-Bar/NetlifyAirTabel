import {createSlice} from '@reduxjs/toolkit';

const getLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if(cart) {
      return JSON.parse(localStorage.getItem('cart'))  ;
    } else {
        return []
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: getLocalStorage(),
        total_items:0,
        total_amount:0,
        shipping_fee:534,
        },
    reducers:{    
        addToCart(state, action){
            const {id, mainColor, amount, product} = action.payload
            const tempItem = state.cart.find((i) => i.id === id + mainColor)
            if(tempItem){
                const tempCart = state.cart.map((cartItem) => {
                    if(cartItem.id === id + mainColor){
                        let newAmount = cartItem.amount + amount;
                        if(newAmount > cartItem.max) {
                            newAmount = cartItem.max;
                        }
                        return {...cartItem, amount: newAmount}
                    }else {
                        return cartItem
                    }
                })
                state.cart = tempCart;
            } else {
                const newItem = {
                    id: id + mainColor,
                    color: mainColor,
                    amount,
                    image: product.images[0].url,
                    price: product.price,
                    max: product.stock,
                    name: product.name
                }
                 state.cart = [...state.cart, newItem];
                 localStorage.setItem('cart', JSON.stringify(state.cart))
            }

        },
        clearCart(state, action){
            state.cart = [];
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeCartItem(state, action){
            const tempCart = state.cart.filter((item) => item.id !== action.payload)
            return { ...state, cart: tempCart }
        },
        toggleAmount(state, action) {
                const { id, value } = action.payload
                const tempCart = state.cart.map((item) => {
                  if (item.id === id) {
                    if (value === 'inc') {
                      let newAmount = item.amount + 1
                      if (newAmount > item.max) {
                        newAmount = item.max
                      }
                      return { ...item, amount: newAmount }
                    }
                    if (value === 'dec') {
                      let newAmount = item.amount - 1
                      if (newAmount < 1) {
                        newAmount = 1
                      }
                      return { ...item, amount: newAmount }
                    }
                  }
                  return item
                })
                return { ...state, cart: tempCart }
                
        }
    }
})



export const {addToCart, clearCart, removeCartItem, toggleAmount} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;