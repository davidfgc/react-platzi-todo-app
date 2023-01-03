import React from "react";

import { TodoContext } from "../TodoContext";

import "./TodoForm.css";

function TodoForm() {

    const { newItemDescription, setNewItemDescription, createNewItem, setShowModal } = React.useContext(TodoContext);

    const onChange = (event) => {
        setNewItemDescription(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        createNewItem();
        setShowModal(false);
    }

    const onCancel = () => {
        setNewItemDescription('');
        setShowModal(false);
    }

    return (
        <div className="todoFormContainer">
            <h1 className="title">Add Item</h1>
            <form className="todoForm" onSubmit={onSubmit}>
                <label className="inputLabel" htmlFor="description">Description</label>
                <textarea className="inputDescription" type="text" name="description" id="description"
                    value={newItemDescription}
                    onChange={onChange} />
                <div className="menuActions">
                    <input className="deleteButton" type="button" value="Cancel" onClick={() => onCancel()}/>
                    <input className="primaryButton" type="submit" value="Add" />
                </div>
            </form>
        </div>
    )
}

export { TodoForm };