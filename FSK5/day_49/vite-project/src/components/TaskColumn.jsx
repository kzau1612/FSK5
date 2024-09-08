import { useMemo, useState } from "react";
import "../assets/scss/TaskColumn.scss";
import Task from "./Task";
import AddTask from "./AddTask";
import TrashIcon from "../Icons/TrashIcon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskColumn = ({
  col,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) => {
  const [editMode, setEditMode] = useState(false);
  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: col.id,
    data: {
      type: "Column",
      column: col,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div className="column overlay" ref={setNodeRef} style={style}>
        <div className="column-top">
          <p className="title">{col.title} </p>
          <TrashIcon deleteColumn={deleteColumn} id={col.id} />
        </div>
        <ul className="task-list"></ul>
        <AddTask />
      </div>
    );
  }

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <div className="column-top" onClick={() => setEditMode(true)} {...attributes} {...listeners}>
        <p className="title">
          {!editMode && `${col.title}`}
          {editMode && (
            <input
              className="title-input"
              value={col.title}
              autoFocus
              onChange={(e) => updateColumn(col.id, e.target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </p>

        <button onClick={() => deleteColumn(col.id)}>
          <TrashIcon deleteColumn={deleteColumn} id={col.id} />
        </button>
      </div>
      <ul className="task-list">
        <SortableContext items={taskIds}>
          {tasks?.map((task) => (
            <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
          ))}
        </SortableContext>
      </ul>
      <AddTask createTask={createTask} id={col.id} />
    </div>
  );
};

export default TaskColumn;
