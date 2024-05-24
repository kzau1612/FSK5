import React, { useContext } from "react";
import TaskItem from "./TaskItem";
import { AppContext } from "../App";

const TaskList = ({ todos }) => {
  console.log(todos);
  return (
    <ul className="task-list">
      {todos.map((todo, index) => (
        <TaskItem key={index} todo={todo} />
      ))}
    </ul>
  );
};

export default TaskList;
