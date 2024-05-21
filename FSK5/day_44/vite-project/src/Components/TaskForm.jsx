import React, { useContext } from "react";
import { AppContext } from "../App";

function TaskForm({ handleFormSubmit }) {
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <input type="text" className="add-input" name="name" placeholder="Thêm một việc làm mới" />
      <button className="add-btn">Thêm mới</button>
      <button type="button" className="search-btn">
        Tìm Kiếm
      </button>
    </form>
  );
}

export default TaskForm;
