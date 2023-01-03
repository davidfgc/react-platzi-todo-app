import React from 'react';

import './TodoList.css';

import { TodoItem } from '../TodoItem';
import { TodoMenu } from '../TodoMenu';


function useLocalStorage(key, initialValue) {
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);
    
    React.useEffect(() => {
        setTimeout(() => {
            const itemString = localStorage.getItem(key) || JSON.stringify(initialValue);
            setItem(JSON.parse(itemString));
            setLoading(false);
        }, 2000);
    }, []);


    const saveItem = (item) => {
        setItem(item);
        localStorage.setItem(key, JSON.stringify(item));
    }

    return {item, saveItem, loading};
}

function TodoList() {
    const currentAppDataTag = 'ROAM_TODOS_APP';

    const {
        item: appData,
        saveItem: saveAppData,
        loading
    } = useLocalStorage(currentAppDataTag, {maxId: 0, items: []});
    const [items, setItems] = React.useState(appData.items);
    const [showingItems, setShowingItems] = React.useState(items);
    const [isHidingCompleted, setIsHidingCompleted] = React.useState(false);
    const [pendingItems, setPendingItems] = React.useState(items.filter(item => !item.completed));
    const [newItemDescription, setNewItemDescription] = React.useState('');

    // TODO check the warning
    React.useEffect(() => setItems(appData.items), [appData])
    React.useEffect(() => updateShowingItems(), [isHidingCompleted, items])
    
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
        setNewItemDescription('');
    }

    const saveItems = (newItems) => {
        setItems(newItems);
        appData.items = newItems;
        saveAppData(appData);
    }

    return (
        <div className='todoList'>
            <h1 className='title'>My TODOs list</h1>            
            <TodoMenu 
                newItemDescription={newItemDescription}
                setNewItemDescription={setNewItemDescription}
                createNewItem={createNewItem}
                saveItems={saveItems}
                items={items}
                isHidingCompleted={isHidingCompleted}
                toggleHideCompleted={toggleHideCompleted}
                pendingItems={pendingItems} />
            {loading && <div>Loading...</div>}
            {showingItems.map(item => 
                <TodoItem key={item.id} item={item} completeItem={() => completeItem(item)}/>
            )}
        </div>
    )
}

export { TodoList };