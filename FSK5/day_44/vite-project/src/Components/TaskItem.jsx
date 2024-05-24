import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";

const TaskItem = ({ todo, index }) => {
  const { deleteTodo, updateTodo } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  useEffect(() => {
    setEditValue(todo.todo);
  }, [todo.todo]);

  useEffect(() => {
    setIsCompleted(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleQuitClick = () => {
    setIsEditing(false);
    setEditValue(todo.todo);
    setIsCompleted(todo.isCompleted);
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleUpdateClick = () => {
    updateTodo(todo._id, editValue, isCompleted);
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  const handleDeleteClick = () => {
    setIsEditing(false); // Reset the isEditing state
    deleteTodo(todo._id);
  };

  return (
    <li className="task-item" key={index}>
      <input
        type="text"
        className="task-item__input"
        value={isEditing ? editValue : todo.todo}
        readOnly={!isEditing}
        onChange={handleInputChange}
        style={{ textDecoration: isCompleted ? "line-through" : "" }}
      />
      {isEditing ? (
        <div className="task-item__actions">
          <div className="row">
            <span>Completed</span>
            <input type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} />
          </div>
          <div className="row">
            <button className="quit-btn" onClick={handleQuitClick}>
              Thoát
            </button>
            <button className="update-btn" onClick={handleUpdateClick}>
              Update
            </button>
            <button className="delete-btn" onClick={handleDeleteClick}>
              Xóa
            </button>
          </div>
        </div>
      ) : (
        <div className="task-item__actions">
          <div className="row">
            <button className="edit-btn" onClick={handleEditClick}>
              Sửa
            </button>
            <button className="delete-btn" onClick={handleDeleteClick}>
              Xóa
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
