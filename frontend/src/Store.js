import { createContext, useReducer } from 'react';

export const Store = createContext();

// Definición del estado inicial
const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      // Se mantiene 'cart' tal y como está y se le añade el nuevo item.
      return {
        ...state, // mantiene el estado inicial pero modifica cart.
        cart: {
          ...state.cart, // mantiene el estado incial de cart pero modificar cartItems.
          cartItems: [...state.cart.cartItems, action.payload], // mantiene los Items que ya hay y añade el nuevo.
        },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  // Definición del useReducer.
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
