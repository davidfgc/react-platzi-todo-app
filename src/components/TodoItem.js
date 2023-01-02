import React from "react";

import './TodoItem.css';

function TodoItem() {
    const [checked, setChecked] = React.useState(false);
    
    const checkItem = () => {
        setChecked(!checked);
    }

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" className="todoItem" onClick={checkItem}>
            <label htmlFor='name'>Hola</label>
            <input type={'checkbox'} id='name' checked={checked}/>
        </a>
    )
}

export { TodoItem };