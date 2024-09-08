import "./App.css";
import TaskColumn from "./components/TaskColumn";
import { useState, useId, useMemo, act } from "react";
import AddColumn from "./components/AddColumn";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensors,
  useSensor,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Task from "./components/Task";
function App() {
  const [cols, setCols] = useState([]);
  const columnsId = useMemo(() => cols.map((col) => col.id), [cols]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    })
  );

  // const [tasks, setTasks] = useState([]);

  const createNewColumn = () => {
    const column = {
      id: generateId(),
      title: `Column ${cols.length + 1}`,
    };
    setCols([...cols, column]);
  };

  const generateId = () => {
    return parseInt(Date.now() * Math.random()).toString();
  };

  const deleteColumn = (id) => {
    const newCols = cols.filter((col) => col.id !== id);
    setCols(newCols);

    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  };

  const onDragStart = ({ active }) => {
    if (active.data.current.type === "Column") {
      setActiveColumn(active.data.current.column);
      return;
    }
    if (active.data.current.type === "Task") {
      setActiveTask(active.data.current.task);
      return;
    }
  };

  const onDragEnd = ({ active, over }) => {
    setActiveColumn(null);
    setActiveTask(null);
    if (!over) {
      return;
    }

    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) {
      return;
    }
    setCols((cols) => {
      const activeColumnIndex = cols.findIndex((col) => col.id === activeColumnId);
      const overColumnIndex = cols.findIndex((col) => col.id === overColumnId);

      return arrayMove(cols, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = ({ active, over }) => {
    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) {
      return;
    }

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);
        const overTaskIndex = tasks.findIndex((task) => task.id === overId);
        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);
        tasks[activeTaskIndex].columnId = overId;
        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      });
    }
  };

  const updateColumn = (id, title) => {
    const newColumn = cols.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setCols(newColumn);
  };

  const createTask = (columnId) => {
    const task = {
      id: generateId(),
      content: `Task ${tasks.length + 1}`,
      columnId,
    };
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id, content) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="wrapper">
          <SortableContext items={columnsId}>
            {cols?.map((col) => (
              <TaskColumn
                key={col.id}
                col={col}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </SortableContext>
          <AddColumn createNewColumn={createNewColumn} />
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <TaskColumn
                col={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
            {activeTask && (
              <Task task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default App;
