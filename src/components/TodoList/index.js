import React from 'react';

import './TodoList.css';

import { TodoContext } from '../TodoContext';
import { TodoItem } from '../TodoItem';
import { TodoMenu } from '../TodoMenu';

function TodoList() {

    const {showingItems, loading, completeItem} = React.useContext(TodoContext);

    return (
        <div className='todoList'>
            <h1 className='title'>My TODOs list</h1>          
            <TodoMenu />
            {loading && <div>Loading...</div>}
            {showingItems.map(item => 
                <TodoItem key={item.id} item={item} completeItem={() => completeItem(item)}/>
            )}
        </div>
    )
}

export { TodoList };