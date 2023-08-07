// Checkout form component
import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// helper functions (to check if input is empty & check if ZIP code is 5 characters)
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

// component
const Checkout = (props) => {
  const [inputFieldsValidity, setInputFieldsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // basic input field(s) validation
    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = isFiveChars(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);

    setInputFieldsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid
    });

    // basic form validation
    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    // form is INVALID so just return
    if (!formIsValid) {
      return;
    }
    // else, send in the order!
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity
    });
  };

  // dynamic CSS classes
  const nameControlClasses = `${classes.control} ${
    !inputFieldsValidity.name && classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    !inputFieldsValidity.street && classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    !inputFieldsValidity.postal && classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    !inputFieldsValidity.city && classes.invalid
  }`;

  // return block for component
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name:</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!inputFieldsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Your Street Address:</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!inputFieldsValidity.street && (
          <p>Please enter a valid street address</p>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Your ZIP Code:</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!inputFieldsValidity.postal && <p>Please enter a valid ZIP code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Your City:</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!inputFieldsValidity.city && <p>Please enter a valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
