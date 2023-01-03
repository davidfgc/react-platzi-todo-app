import React from 'react';

import './App.css';
import { TodoContext } from '../components/TodoContext';
import { TodoList } from '../components/TodoList';
import { Modal } from '../components/Modal';
import { TodoForm } from '../components/TodoForm';

function App() {

  const {showModal } = React.useContext(TodoContext);

  return (
    <>
      <TodoList />
      {showModal &&
          <Modal>
              <TodoForm />
          </Modal>
      }
    </>
  );
}

export default App;
