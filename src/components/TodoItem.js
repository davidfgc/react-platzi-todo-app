import React from "react";

import './TodoItem.css';

function TodoItem() {
    const checkItem = () => {
        console.log('checkItem');
    }

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" className="todoItem" onClick={checkItem}>
            <label htmlFor='name'>Hola</label>
            <input type={'checkbox'} id='name'/>
        </a>
    )
}

export { TodoItem };