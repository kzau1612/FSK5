import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editedTasks, setEditedTasks] = useState({});
  const [taskStatus, setTaskStatus] = useState({});
  const [newTask, setNewTask] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const apiUrl = "https://api-todo-ebon.vercel.app/api/v1";

  const getEmail = async () => {
    if (!localStorage.getItem("userEmail")) {
      const userEmail = prompt("Please enter your email:");
      if (userEmail) {
        localStorage.setItem("userEmail", userEmail);
        getApiKey();
      }
    } else {
      getApiKey();
    }
  };

  const getApiKey = async () => {
    const email = localStorage.getItem("userEmail");
    const url = apiUrl + "/api-key?email=" + email;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const { apiKey } = data.data;
      if (apiKey) {
        localStorage.setItem("apiKey", apiKey);
        getTasks();
        return true;
      } else {
        localStorage.removeItem("userEmail");
        getEmail();
        return false;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      localStorage.removeItem("userEmail");
      getEmail();
      return false;
    }
  };

  const getTasks = async () => {
    const url = apiUrl + "/todos";
    const key = localStorage.getItem("apiKey");
    if (key) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": key,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTasks(data.data.listTodo);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const deleteTask = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa task này không?");
    if (confirm) {
      const key = localStorage.getItem("apiKey");
      console.log("id: " + id);
      console.log("key: " + key);
      if (key) {
        const url = apiUrl + "/todos/" + id;
        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": key,
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          getTasks();
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    }
  };

  const handleTaskEdit = (taskId, newValue) => {
    setEditedTasks((prevEditedTasks) => ({
      ...prevEditedTasks,
      [taskId]: newValue,
    }));
  };

  const updateTask = async (id) => {
    const key = localStorage.getItem("apiKey");
    const editedTask = editedTasks[id];
    if (key && editedTask) {
      const url = apiUrl + "/todos/" + id;
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": key,
          },
          body: JSON.stringify({ todo: editedTask }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("ok");
        getTasks();
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addNewTask(newTask.trim());
      setNewTask("");
    }
  };

  const handleCheckboxChange = async (index, id) => {
    const key = localStorage.getItem("apiKey");
    const isCompleted = tasks[index].isCompleted;
    console.log(isCompleted);
    if (key) {
      const url = `${apiUrl}/todos/${id}`;
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": key,
          },
          body: JSON.stringify({ isCompleted: !isCompleted }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        getTasks();
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const addNewTask = async () => {
    const key = localStorage.getItem("apiKey");
    if (key) {
      const url = `${apiUrl}/todos`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": key,
          },
          body: JSON.stringify({ todo: newTask }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("ok");

        getTasks();
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const searchValueRef = useRef("");

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = async (keyword) => {
    const key = localStorage.getItem("apiKey");
    if (key) {
      const url = `${apiUrl}/todos?${keyword ? "q=" + keyword : ""}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": key,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // console.log("ok");

        const data = await response.json();
        setTasks(data.data.listTodo);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const debouncedHandleSearch = debounce(handleSearch, 1000);

  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {
    debouncedHandleSearch(searchValue);
  }, [searchValue]);

  // console.log(tasks);

  return (
    <>
      <div className="container">
        <h1>Welcome to Todo App</h1>
        <form className="form" onSubmit={handleAddNewTask}>
          <input
            type="text"
            className="add-input"
            placeholder="Thêm một việc làm mới"
            onChange={(e) => {
              setNewTask(e.target.value);
              setSearchValue(e.target.value);
            }}
            value={newTask}
          />

          <button className="add-btn">Thêm mới</button>
          <button type="button" className="search-btn">
            Tìm Kiếm
          </button>
        </form>
        {tasks ? (
          <div className="task-list">
            {tasks.map((task, index) => (
              <div className="task-item" key={task._id}>
                <input
                  type="text"
                  className="task-item__input"
                  defaultValue={task.todo}
                  readOnly={!taskStatus[task._id]}
                  style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
                  onChange={(e) => handleTaskEdit(task._id, e.target.value)}
                />
                {!taskStatus[task._id] ? (
                  <div className="task-item__actions">
                    <div className="row">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setTaskStatus((prevState) => ({
                            ...prevState,
                            [task._id]: !prevState[task._id],
                          }));
                        }}
                      >
                        Sửa
                      </button>
                      <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="task-item__actions">
                    <div className="row">
                      <span>Completed</span>
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleCheckboxChange(index, task._id)}
                      />
                    </div>
                    <div className="row">
                      <button
                        className="quit-btn"
                        onClick={() => {
                          setTaskStatus((prevState) => ({
                            ...prevState,
                            [task._id]: !prevState[task._id],
                          }));
                        }}
                      >
                        Thoát
                      </button>
                      <button
                        className="update-btn"
                        onClick={() => {
                          updateTask(task._id);
                          setTaskStatus((prevState) => ({
                            ...prevState,
                            [task._id]: false,
                          }));
                        }}
                      >
                        Update
                      </button>
                      <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
