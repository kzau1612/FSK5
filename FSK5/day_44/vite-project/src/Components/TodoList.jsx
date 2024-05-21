import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ todos }) => {
  console.log(todos);
  return (
    <div className="task-list">
      {todos.map((todo, index) => (
        <TaskItem key={index} todo={todo} />
      ))}
    </div>
  );
};

export default TaskList;
