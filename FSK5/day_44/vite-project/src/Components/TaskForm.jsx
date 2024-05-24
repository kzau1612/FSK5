import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";

function TaskForm({ handleFormSubmit, handleSearch, setMode, mode }) {
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        className="add-input"
        name="name"
        placeholder="Thêm một việc làm mới"
        onChange={mode === 1 ? () => {} : handleSearch}
      />
      <button className="add-btn" onClick={() => setMode(1)}>
        Thêm mới
      </button>
      <button
        type="button"
        className="search-btn"
        onClick={() => {
          setMode(2);
        }}
      >
        Tìm Kiếm
      </button>
    </form>
  );
}

export default TaskForm;
