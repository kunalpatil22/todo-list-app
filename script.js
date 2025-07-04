// Fetch todos from local storage
let todos = localStorage.getItem("todos");

// Initialize todos as an empty array if it doesn't already exist in local storage
if (todos == null) {
  todos = [];
} else {
  todos = JSON.parse(todos);
}

// Event to handle request to render todo list on page load
document.addEventListener("DOMContentLoaded", (e) => renderTodoList());

// Event to handle request for adding new todo
document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formdata = new FormData(e.target);

  const title = formdata.get("title");

  const todo = { id: crypto.randomUUID(), title, is_done: false };

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodoList();

  e.target.reset();
});

function renderTodoList() {
  const todo_list_el = document.getElementById("todo-list");
  let todo_list = "";
  todos.forEach((todo) => {
    todo_list += `
            <li >
                <div>
                    <input type="checkbox" ${
                      todo.is_done ? "checked" : ""
                    } onchange="updateTodo(event);" data-todo-id="${todo.id}" />
                    <p>${todo.title}</p>
                </div>
                <button onclick="deleteTodo(event);" data-todo-id="${
                  todo.id
                }">&times;</button>
            </li>
        `;
  });

  todo_list_el.innerHTML = todo_list;
}

function updateTodo(e) {
  const index = todos.findIndex((todo) => todo.id == e.target.dataset.todoId);
  todos[index].is_done = e.target.checked;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodoList();
}

function deleteTodo(e) {
  todos = todos.filter((todo) => todo.id != e.target.dataset.todoId);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodoList();
}
