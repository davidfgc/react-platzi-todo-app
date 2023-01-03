import React from 'react';

import './App.css';
import { TodoContext } from '../components/TodoContext';
import { TodoList } from '../components/TodoList';
import { Modal } from '../components/Modal';

function App() {

  const {showModal } = React.useContext(TodoContext);

  return (
    <>
      <TodoList />
      {showModal &&
          <Modal>
              <h1>Modal 2</h1>
          </Modal>
      }
    </>
  );
}

export default App;
