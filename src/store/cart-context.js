// State context for the cart
import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (newItem) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

export default CartContext;
