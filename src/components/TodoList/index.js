import React from 'react';

import './TodoList.css';

import { TodoContext } from '../TodoContext';
import { TodoItem } from '../TodoItem';
import { TodoMenu } from '../TodoMenu';

function TodoList() {
    return (
        <div className='todoList'>
            <h1 className='title'>My TODOs list</h1>          
            <TodoMenu />
            <TodoContext.Consumer>
                {({showingItems, loading, completeItem}) => (
                    <>
                        {loading && <div>Loading...</div>}
                        {showingItems.map(item => 
                            <TodoItem key={item.id} item={item} completeItem={() => completeItem(item)}/>
                        )}
                    </>
                )}
            </TodoContext.Consumer>
        </div>
    )
}

export { TodoList };