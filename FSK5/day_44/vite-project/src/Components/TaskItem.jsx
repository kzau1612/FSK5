import React, { useContext } from "react";
import { AppContext } from "../App";

const TaskItem = ({ todo, index }) => {
  return (
    <div className="task-item" key={index}>
      <input
        type="text"
        className="task-item__input"
        defaultValue={todo.todo}
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      />

      <div className="task-item__actions">
        <div className="row">
          <button className="edit-btn">Sửa</button>
          <button className="delete-btn">Xóa</button>
        </div>
      </div>

      <div className="task-item__actions">
        <div className="row">
          <span>Completed</span>
          <input type="checkbox" />
        </div>
        <div className="row">
          <button className="quit-btn">Thoát</button>
          <button className="update-btn">Update</button>
          <button className="delete-btn">Xóa</button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
