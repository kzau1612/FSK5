import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [key, setKey] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const apiUrl = "https://api-todo-ebon.vercel.app/api/v1";

  const getApiKey = async (email) => {
    const url = apiUrl + "/api-key?email=" + email;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const { apiKey } = data.data;
      setKey(apiKey);
      return true;
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
  };

  const getTasks = async () => {
    const url = apiUrl + "/todos";
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
  };

  useEffect(() => {
    const getEmail = async () => {
      if (!key) {
        const userEmail = prompt("Please enter your email:");
        if (userEmail) {
          setIsSuccess(await getApiKey(userEmail));
        }
      }
    };
    getEmail();
  }, [isSuccess]);

  useEffect(() => {
    if (key) {
      getTasks();
    }
  }, [key]);

  console.log(tasks);

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
              <div className="task-item" key={index}>
                <input type="text" className="task-item__input" value={task.todo} data-status={task.isCompleted} />
                {!status ? (
                  <div className="task-item__actions">
                    <div className="row">
                      <button className="edit-btn">Sửa</button>
                      <button className="delete-btn">Xóa</button>
                    </div>
                  </div>
                ) : (
                  <div className="task-item__actions">
                    <div className="row">
                      <span>Completed</span>
                      <input type="checkbox" />
                    </div>
                    <div className="row">
                      <button className="quit-btn">Thoát</button>
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
