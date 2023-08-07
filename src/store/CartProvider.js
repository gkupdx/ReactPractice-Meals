// CartProvider (Provider) component that provides access to the CartContext
// by WRAPPING any children components
import { useReducer } from "react";
import CartContext from "./cart-context";

const initialCartState = {
  items: [],
  totalAmount: 0
};

// reducer function
function cartReducer(state, action) {
  /* on ADDING an item to cart */
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.payload.price * action.payload.amount;
    // check to see if added item already exists in the cart via its index
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // found an existing item in the cart, so just increase its amount
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // using concat() to return a NEW array with updated values
      // vs push() that MODIFIES the existing array
      updatedItems = state.items.concat(action.payload);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  /* on REMOVING an item from cart */
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    // only one such item in the cart so just remove it entirely from the cart
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.payload);
    } else {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  /* on SUCCESSFUL ORDER SUBMISSION, clear the cart */
  if (action.type === "CLEAR") return initialCartState;

  return initialCartState;
}

//// component function
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemToCartHandler = (newItem) => {
    dispatchCartAction({ type: "ADD_ITEM", payload: newItem });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  // helper object that will store the ACTUAL state data that is provided
  const cartContextHelper = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContextHelper}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
