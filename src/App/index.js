import React from 'react';

import './App.css';
import { TodoProvider } from '../components/TodoContext';
import { TodoList } from '../components/TodoList';

function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

export default App;
