import { useEffect, useState, createContext } from "react";
export const AppContext = createContext();
import "./App.css";
import { httpClient } from "./Ultils/client";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  httpClient.serverApi = "https://api-todo-ebon.vercel.app/api/v1";

  const checkEmail = async () => {
    const pattern = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/gm;
    let email = localStorage.getItem("email");
    if (!email) {
      email = prompt("Please enter your email");
      if (email && pattern.test(email)) {
        localStorage.setItem("email", email);
      } else {
        return checkEmail();
      }
    }
    await getApiKey();
  };

  const getApiKey = async () => {
    const email = localStorage.getItem("email");
    if (email) {
      const { res, data } = await httpClient.get(`/api-key?email=${email}`);
      if (res.ok) {
        const apiKey = data.data.apiKey;
        localStorage.setItem("apiKey", apiKey);
        httpClient.apiKey = apiKey;
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("apiKey");
        await checkEmail();
      }
    }
  };

  const getTodoList = async () => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      try {
        const { res, data } = await httpClient.get("/todos");
        if (res.ok) {
          setTodos(data.data.listTodo);
        } else {
          console.error("Failed to fetch todo list");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    if (name && name.trim()) {
      addNewTodo(name);
      e.target.reset();
    }
  };

  const addNewTodo = async (name) => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      try {
        const { res, data } = await httpClient.post("/todos", { todo: name });
        if (res.ok) {
          const newTodo = data.data;
          const newTodos = [...todos, newTodo];
          setTodos(newTodos);
          console.log(todos);
        } else {
          console.error("Failed to add new todo");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await checkEmail();
      await getTodoList();
    };
    initialize();
  }, []);

  return (
    <div className="container">
      <TaskForm handleFormSubmit={handleFormSubmit} />
      {todos && <TaskList todos={todos} />}
    </div>
  );
}

export default App;
