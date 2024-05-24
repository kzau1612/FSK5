import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";

function TaskForm({ handleFormSubmit, handleSearch, setMode, mode }) {
  const [value, setValue] = useState("");
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        className="add-input"
        name="name"
        placeholder="Thêm một việc làm mới"
        onChange={
          mode === 1
            ? (e) => {
                setValue(e.target.value);
              }
            : (e) => {
                handleSearch(e.target.value);
                setValue(e.target.value);
              }
        }
      />
      <button
        className="add-btn"
        onClick={() => {
          setMode(1);
        }}
      >
        Thêm mới
      </button>
      <button
        type="button"
        className="search-btn"
        onClick={() => {
          setMode(2);
          handleSearch(value);
        }}
      >
        Tìm Kiếm
      </button>
    </form>
  );
}

export default TaskForm;
