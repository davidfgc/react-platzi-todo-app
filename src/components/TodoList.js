import React from 'react';
import { useEffect } from 'react';

import './TodoList.css';

import { TodoItem } from './TodoItem';


function TodoList() {
    
    const defatulItems = [
        {id: 0, description: 'My pending item', completed: false},
        {id: 1, description: 'My completed item', completed: true},
    ];
    const [items, setItems] = React.useState(defatulItems);
    const [showingItems, setShowingItems] = React.useState(items);
    const [isHidingCompleted, setIsHidingCompleted] = React.useState(false);
    const [pendingItems, setPendingItems] = React.useState(items.filter(item => !item.completed));

    // TODO check the warning
    useEffect(() => updateShowingItems(), [isHidingCompleted, items])
    
    const toggleHideCompleted = () => {
        setIsHidingCompleted(!isHidingCompleted);
    }

    const completeItem = (item) => {
        const itemsCopy = [...items];
        itemsCopy[items.findIndex(i => i.id === item.id)].completed = !item.completed;
        setItems(itemsCopy);
        updateShowingItems();
    }
    
    const updateShowingItems = () => {
        setPendingItems(items.filter(item => !item.completed));
        if (isHidingCompleted) {
            setShowingItems(pendingItems);
        }
        else
            setShowingItems(items);
    }

    return (
        <div className='todoList'>
            <h1>My TODO list</h1>
            <h5>{pendingItems.length} pending</h5>
            <h5>
                <input type={'checkbox'} id='inHideCompleted' defaultChecked={isHidingCompleted} onChange={toggleHideCompleted}/>
                <label htmlFor='inHideCompleted'>Hide completed</label>
            </h5>
            {showingItems.map(item => 
                <TodoItem key={item.id} item={item} completeItem={() => completeItem(item)}/>
            )}
        </div>
    )
}

export { TodoList };