import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../Icons/TrashIcon";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task, deleteTask, updateTask }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <li
        onClick={toggleEditMode}
        className="task-item overlay"
        key={task.id}
        ref={setNodeRef}
        style={style}
      >
        <p>{task.content}</p>
      </li>
    );
  }

  if (editMode) {
    return (
      <li
        className="task-item"
        key={task.id}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <textarea
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
          defaultValue={task.content}
          onBlur={toggleEditMode}
        >
          {/* {task.content} */}
        </textarea>
      </li>
    );
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="task-item"
      key={task.id}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p>
        {task.content}
        {mouseIsOver && (
          <button onClick={() => deleteTask(task.id)}>
            <TrashIcon />
          </button>
        )}
      </p>
    </li>
  );
};

export default Task;
