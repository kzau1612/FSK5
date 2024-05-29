import { useEffect, useState, createContext } from "react";
export const AppContext = createContext();
import "./App.css";
import { httpClient } from "./Ultils/client";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todos2, setTodos2] = useState([]);
  const [mode, setMode] = useState(1);

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
          setTodos2(data.data.listTodo);
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
          const newTodo = [data.data];
          const newTodos = [...todos];
          setTodos([...newTodo, ...newTodos]);
          setTodos2([...newTodo, ...newTodos]);
        } else {
          console.error("Failed to add new todo");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const deleteTodo = async (id) => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey && confirm("Bạn có chắc chắc muốn xóa?")) {
      try {
        const { res, data } = await httpClient.delete("/todos/" + id);
        if (res.ok) {
          const newTodos = todos.filter(({ _id }) => !(_id === id));

          setTodos(newTodos);
          setTodos2(newTodos);
        } else {
          console.error("Failed to delete todo");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const updateTodo = async (id, value, isCompleted) => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      try {
        const { res, data } = await httpClient.patch("/todos/" + id, { todo: value, isCompleted: isCompleted });
        if (res.ok) {
          const newTodos = todos.map((todo) => {
            if (todo._id === id) {
              return { ...todo, todo: value, isCompleted: isCompleted };
            }
            return todo;
          });
          setTodos(newTodos);
          setTodos2(newTodos);
        } else {
          console.error("Failed to delete todo");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const debounce = (func, timeout = 300) => {
    let timer; //Lưu trữ giá trị của setTimeout
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  };

  const handleSearch = debounce((value) => {
    const keyword = value ? value.trim() : "";
    const newTodos = todos.filter((todo) => todo.todo.includes(keyword));
    setTodos2(newTodos);
  }, 300);

  useEffect(() => {
    const initialize = async () => {
      await checkEmail();
      await getTodoList();
    };
    initialize();

    const handleBeforeUnload = () => {
      localStorage.removeItem("email");
      localStorage.removeItem("apiKey");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  if (mode === 2) {
    console.log("mode 2");
  } else {
    console.log("mode 1");
  }

  return (
    <AppContext.Provider value={{ deleteTodo, updateTodo }}>
      <div className="container">
        <TaskForm handleFormSubmit={handleFormSubmit} handleSearch={handleSearch} setMode={setMode} mode={mode} />
        {todos2 && <TaskList todos={todos2} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
