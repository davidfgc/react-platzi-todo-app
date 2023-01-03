import React from "react";

import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

// bring here all the props we want to make globally available
function TodoProvider({children}) {
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
    const [showModal, setShowModal] = React.useState(false);

    // TODO check the warning
    React.useEffect(() => setItems(appData.items), [appData])
    React.useEffect(() => updateShowingItems(), [isHidingCompleted, items])
    
    const toggleHideCompleted = () => {
        setIsHidingCompleted(prevState => !prevState);
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
        <TodoContext.Provider value={{
            items,
            showingItems,
            isHidingCompleted,
            pendingItems,
            newItemDescription,
            setNewItemDescription,
            createNewItem,
            saveItems,
            completeItem,
            toggleHideCompleted,
            loading,
            showModal,
            setShowModal
        }}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };