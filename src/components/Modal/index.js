import React from "react";
import ReactDOM from "react-dom";
import { TodoContext } from "../TodoContext";

import "./Modal.css";

function Modal({ children }) {

const { setShowModal } = React.useContext(TodoContext);

  return ReactDOM.createPortal(
    <div className="modal" onClick={() => setShowModal(false)}>{children}</div>,
    document.getElementById("modal"));
}

export { Modal };