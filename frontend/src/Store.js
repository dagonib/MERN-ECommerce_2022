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
      // Variable del producto añadido.
      const newItem = action.payload; // Producto seleccionado

      // Busca en el array cartItems un producto con el id del newItem (nuevo producto).
      // Si existe tendrá el valor del newItem, sino no tendrá valor.
      const existItem = state.cart.cartItems.find(
        // Producto existente en el cartItems
        (item) => item._id === newItem._id
      );

      // No lo entiendo
      // Si ya existe este producto en el cart,
      // es necesario utilizar la función map en el array cartItem
      // para actualizar el actual item con el new item,
      // de otra forma se mantiene el item previo en el cart.
      const cartItems = existItem
        ? state.cart.cartItems.map(
            (item) => (item._id === existItem._id ? newItem : item) // Si el item del array cartItems es igual al existItem, lo sustituye, sino mantiene los valores del array. No es necesaria esta parte pq en cualquier caso que el array igual.
          )
        : [...state.cart.cartItems, newItem]; // se añade el nuevo item.

      return { ...state, cart: { ...state.cart, cartItems } };

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
