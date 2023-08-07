// HeaderCartButton component
import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  // transform the array of cart items into a single number value
  const cartItemsNum = cartCtx.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  // storing CSS classes responsible for ANIMATION into one variable
  // but conditionally check to see if animation should play
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  // useEffect() responsible for triggering the "bump" btn animation
  // if there are 0 cart items, do not play animation.
  // otherwise, trigger animation, and then reset the condition (state) after 0.3 sec
  useEffect(() => {
    if (cartCtx.items.length === 0) return;
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsNum}</span>
    </button>
  );
};

export default HeaderCartButton;
