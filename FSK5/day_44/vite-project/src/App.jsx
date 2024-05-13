import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [status, setStatus] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState({});

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
    console.log(key);
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

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Welcome to Todo App</h1>
        <div className="top">
          <input type="text" className="add-input" placeholder="Thêm một việc làm mới" />
          <button className="add-btn">Thêm mới</button>
        </div>
        {tasks ? (
          <div className="task-list">
            {tasks.map((task, index) => (
              <div className="task-item" key={task._id}>
                <input type="text" className="task-item__input" value={task.todo} data-status={task.isCompleted} />
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
                      <input type="checkbox" />
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
                      <button className="update-btn">Update</button>
                      <button className="delete-btn">Xóa</button>
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
