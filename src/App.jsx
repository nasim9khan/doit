// src/App.jsx
import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import './styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="container">
          <h1>To Do List</h1>
          <TaskInput />
          <TaskList />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
