import React from 'react';

import { TodoContext } from '../TodoContext';
import './TodoMenu.css';

function TodoMenu() {

    const {newItemDescription,
        setNewItemDescription,
        createNewItem,
        saveItems,
        items,
        isHidingCompleted,
        toggleHideCompleted,
        pendingItems} = React.useContext(TodoContext);

    return (
        <div className='topMenu'>
            <div className='createItem'>
                <input
                    className='inputDescription'
                    type={'text'} 
                    placeholder={'New item description'} 
                    value={newItemDescription} 
                    onChange={(arg) => setNewItemDescription(arg.target.value)}/>
                <input className='primaryButton' type={'button'} value={'Create'} onClick={createNewItem}/>
            </div>
            <div className='menuActions'>
                <input className='deleteButton' type={'button'} value={'Delete completed'} onClick={() => saveItems(pendingItems)}/>
                <input 
                    className='primaryButton' 
                    type={'button'} 
                    value={`${isHidingCompleted ? 'Show Completed' : 'Hide Completed'} (${items.length - pendingItems.length})`} 
                    onClick={toggleHideCompleted}/>
            </div>
        </div>
    )
}

export { TodoMenu };