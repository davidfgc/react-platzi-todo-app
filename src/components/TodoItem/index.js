import React from "react";

import './TodoItem.css';

function TodoItem({item, completeItem}) {
    
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" className={`todoItem ${item.completed ? 'completed' : ''}`} onClick={ completeItem }>
            <label htmlFor='name'>{item.id} { item.description }</label>
            <input type={'checkbox'} id='name' checked={ item.completed }/>
        </a>
    )
}

export { TodoItem };