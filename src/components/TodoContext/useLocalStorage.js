import React from "react";

function useLocalStorage(key, initialValue) {
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);
    
    React.useEffect(() => {
        setTimeout(() => {
            const itemString = localStorage.getItem(key) || JSON.stringify(initialValue);
            setItem(JSON.parse(itemString));
            setLoading(false);
        }, 1000);
    }, []);


    const saveItem = (item) => {
        setItem(item);
        localStorage.setItem(key, JSON.stringify(item));
    }

    return {item, saveItem, loading};
}

export { useLocalStorage };