// Modal (UI) component
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

// small Backdrop "component"
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

// small ModalOverlay "component"
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// variable to store the LOCATION of the portal in index.html, designated by its "id"
const portalElement = document.getElementById("overlays");

// main Modal component
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
