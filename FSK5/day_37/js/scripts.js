const toggleBtn = document.querySelector(".toggle");
const addBtn = document.querySelector(".add-todo");
const cancelBtn = document.querySelector(".add-form .cancel");
const addForm = document.querySelector(".add-form");
const bg = document.querySelector(".bg");
const todoList = document.querySelector(".todo-list");
const completedTodoList = document.querySelector(".completed-todo-list");
const inputAdd = document.querySelector(".add-form-inner input");
const editForm = document.querySelector(".edit-form");
const cancelBtn2 = document.querySelector(".edit-form .cancel");
const searchInput = document.querySelector(".search-input");
let completedCount = 0;
let id;
let todoName;

cancelBtn2.addEventListener("click", (e) => {
  e.preventDefault();
  editForm.classList.toggle("hidden");
  bg.classList.toggle("hidden");
});

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("close");
  completedTodoList.classList.toggle("hidden");
});

addBtn.addEventListener("click", () => {
  addForm.classList.toggle("hidden");
  bg.classList.toggle("hidden");
});

bg.addEventListener("click", () => {
  addForm.classList.toggle("hidden");
  bg.classList.toggle("hidden");
});

cancelBtn.addEventListener("click", (e) => {
  addForm.classList.toggle("hidden");
  bg.classList.toggle("hidden");
  e.preventDefault();
});

const apiUrl = "http://localhost:3000/tasks";

const render = (users) => {
  const completedTasks = users.filter((task) => task.status);
  const incompleteTasks = users.filter((task) => !task.status);

  completedTodoList.innerHTML = `
      ${completedTasks
        .map(
          ({ id, name }) =>
            `<div class="todo-item" data-id = "${id}" data-status="${status}">
        <span class="todo-name">${name}</span>
        <div class="todo-actions">
          <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
          <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="check-btn" ><i class="fa-solid fa-check-to-slot"></i></button>
        </div>
      </div>`
        )
        .join("")}
      `;

  todoList.innerHTML = `
      ${incompleteTasks
        .map(
          ({ id, name, status }) =>
            `<div class="todo-item" data-id = "${id}" data-status="${status}">
        <span class="todo-name">${name}</span>
        <div class="todo-actions">
          <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
          <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="check-btn"><i class="fa-solid fa-check-to-slot"></i></button>
        </div>
      </div>`
        )
        .join("")}
      `;
  toggleBtn.children[0].innerText = completedTasks.length;
  document.querySelectorAll(".todo-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList[0] === "check-btn" || e.target.parentElement.classList[0] === "check-btn") {
        const id = item.dataset.id;
        const status = item.dataset.status;
        changeStatus(id, status);
      }
      if (e.target.classList[0] === "edit-btn" || e.target.parentElement.classList[0] === "edit-btn") {
        id = item.dataset.id;
        todoName = item.querySelector(".todo-name").innerText;
        const input = editForm.querySelector("input");
        input.value = todoName;
        editForm.classList.toggle("hidden");
        bg.classList.toggle("hidden");
      }

      if (e.target.classList[0] === "delete-btn" || e.target.parentElement.classList[0] === "delete-btn") {
        if (confirm("Bạn có chắc chắn?")) {
          const userId = item.dataset.id;
          deleteTask(userId);
        }
      }
    });
  });
};

const showTask = async () => {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  render(tasks);
};

showTask();

const addTask = async (data) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    showTask();
  }
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const inputValue = form.get("name").trim();
  if (!inputValue) {
    alert("Please enter a task.");
    return;
  }
  const task = {
    name: inputValue,
    status: false,
  };
  addTask(task);
  addForm.classList.toggle("hidden");
  bg.classList.toggle("hidden");
  e.target.reset();
});

const editTask = async (id, name) => {
  const response = await fetch(apiUrl + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });
  if (response.ok) {
    showTask();
  }
};

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const inputValue = form.get("name").trim();

  if (!inputValue) {
    alert("Please enter a task.");
    return;
  }
  editTask(id, inputValue);
  editForm.classList.toggle("hidden");
  bg.classList.toggle("hidden");
  e.target.reset();
});

const changeStatus = async (id, status) => {
  const response = await fetch(apiUrl + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: !!status }),
  });
  if (response.ok) {
    showTask();
  }
};

const deleteTask = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    showTask();
  }
};

const toggleEditForm = (e) => {
  e.preventDefault();
  editForm.classList.toggle("hidden");
  bg.classList.toggle("hidden");
};

searchInput.addEventListener("input", (e) => {
  const searchString = e.target.value;
  const items = document.querySelectorAll(".todo-item");
  const count = toggleBtn.children[0];

  items.forEach((item) => {
    const itemText = item.children[0].innerText.trim();
    const itemTextElement = item.children[0];
    if (itemText.includes(searchString)) {
      item.style.display = "";
      const index = itemText.indexOf(searchString);
      const highlightedText = `<span class="highlight">${itemText.substr(index, searchString.length)}</span>`;
      const remainingText = itemText.substr(index + searchString.length);
      itemTextElement.innerHTML = itemText.substr(0, index) + highlightedText + remainingText;
    } else {
      item.style.display = "none";
    }
  });

  const completedTask = document.querySelectorAll(".completed-todo-list .todo-item:not([style='display: none;'])");
  count.innerText = completedTask.length;
});
