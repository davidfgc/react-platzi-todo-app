import React from 'react';
import { useEffect } from 'react';

import './TodoList.css';

import { TodoItem } from '../TodoItem';


function useLocalStorage(key, initialValue) {
    const appDataString = localStorage.getItem(key) || JSON.stringify(initialValue);
    const appData = JSON.parse(appDataString);

    const saveAppData = (appData) => {
        localStorage.setItem(key, JSON.stringify(appData));
    }
    
    return [appData, saveAppData];
}

function TodoList() {
    const currentAppDataTag = 'ROAM_TODOS_APP';
    const [appData, saveAppData] = useLocalStorage(currentAppDataTag, {maxId: 0, items: []});
    const [items, setItems] = React.useState(appData.items);
    const [showingItems, setShowingItems] = React.useState(items);
    const [isHidingCompleted, setIsHidingCompleted] = React.useState(false);
    const [pendingItems, setPendingItems] = React.useState(items.filter(item => !item.completed));
    const [newItemDescription, setNewItemDescription] = React.useState('');

    // TODO check the warning
    useEffect(() => updateShowingItems(), [isHidingCompleted, items])
    
    const toggleHideCompleted = () => {
        setIsHidingCompleted(!isHidingCompleted);
    }

    const completeItem = (item) => {
        const itemsCopy = [...items];
        itemsCopy[items.findIndex(i => i.id === item.id)].completed = !item.completed;
        saveItems(itemsCopy);
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

    const createNewItem = () => {
        if (!newItemDescription) return;

        const itemsCopy = [...items];
        appData.maxId++;
        itemsCopy.push({
            id: appData.maxId,
            description: newItemDescription,
            completed: false
        });
        saveItems(itemsCopy);
    }

    const saveItems = (newItems) => {
        setItems(newItems);
        appData.items = newItems;
        saveAppData(appData);
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
            <div className='createItem'>
                <input
                    className='inputDescription'
                    type={'text'} 
                    placeholder={'New item description'} 
                    value={newItemDescription} 
                    onChange={(arg) => setNewItemDescription(arg.target.value)}/>
                <input className='createButton' type={'button'} value={'Create'} onClick={createNewItem}/>
            </div>
            <div className='deleteItems'>
                <input className='deleteButton' type={'button'} value={'Delete completed'} onClick={() => saveItems(pendingItems)}/>
            </div>
        </div>
    )
}

export { TodoList };