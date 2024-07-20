// src/components/TaskList.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleComplete } from '../store/taskSlice';
import '../styles.css';
import { FaEdit, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const handleSaveEdit = (id) => {
    dispatch(editTask({ id, text: editText }));
    setEditingTask(null);
    setEditText('');
  };
  const handleComplete = (taskId) => {
    dispatch(toggleComplete(taskId));
  };

  return (
    <div>
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <div className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task.id)}
            />
            {editingTask === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span
                className={task.completed ? 'completed' : ''}
              >
                {task.text}
              </span>
            )}
          </div>
          <div className="task-actions">
            <button className="complete" onClick={() => handleComplete(task.id)}>
              {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
            </button>
              {editingTask === task.id ? (
                <button className="save" onClick={() => handleSaveEdit(task.id)}>
                  Save
                </button>
              ) : (
                <button className="edit" onClick={() => handleEdit(task)}>
                  <FaEdit />
                </button>
              )}
              <button
                className="delete"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
