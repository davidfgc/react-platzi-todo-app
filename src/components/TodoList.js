import React from 'react';

import './TodoList.css';

import { TodoItem } from './TodoItem';

function TodoList() {
    return (
        <div className='todoList'>
            <h1>My TODO list</h1>
            <TodoItem />
        </div>
    )
}

export { TodoList };