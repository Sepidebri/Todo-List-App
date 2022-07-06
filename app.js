const addItemButton = document.querySelector(".addItemButton");
const containerType = document.querySelector(".container-type");
const icons = Array.from(document.querySelectorAll(".container-type i"));
const containerTodo = document.querySelector(".container-todo");
const input = document.querySelector("input");
//! addEventeListener
document.addEventListener("DOMContentLoaded", getTodo);
containerTodo.addEventListener("click", optionTodolist);
addItemButton.addEventListener("click", (ev) => {
  containerType.classList.toggle("add");
});
icons.map((icon) => {
  icon.addEventListener("click", (ev) => {
    containerType.classList.toggle("add");
    const iconClass = [`${icon.classList[1]}`, `${icon.classList[2]}`];
    addItem(input.value, iconClass);
    input.value = "";
  });
});
//! function
function addItem(text, iconClass, isSave = true, isDone = false) {
  const todoitem = document.createElement("div");
  todoitem.classList.add("added-item");
  const colorBck = iconClass[1];
  todoitem.classList.add(colorBck);
  if (text.trim() != "") {
    todoitem.innerHTML = `
            <li>${text}</li>
            <i class="fa-solid fa-clipboard-check"></i>
            <i class="fa-solid fa-file-pen"></i>
            <i class="fa-solid fa-trash-can"></i>
        `;
    const type = document.createElement("li");
    todoitem.appendChild(type);
    type.classList.add("fa-solid");
    type.classList.add(iconClass[0]);
    type.classList.add(iconClass[1]);
    todoitem.insertBefore(type, todoitem.childNodes[0]);
    containerTodo.appendChild(todoitem);
    if (isSave) saveTodo(text, iconClass, isDone);
  } else {
    alert("input something");
  }
}

function optionTodolist(event) {
  const iconTargeted = event.target.classList[1];
  const parentTargeted = event.target.parentNode;
  if (iconTargeted === "fa-clipboard-check") {
    parentTargeted.classList.toggle("completed");
  } else if (iconTargeted === "fa-trash-can") {
    parentTargeted.remove();
  } else if (iconTargeted === "fa-file-pen") {
    parentTargeted.childNodes[2].toggleAttribute("contenteditable");
    parentTargeted.classList.toggle("editting");
  }
}
function saveTodo(text, iconClass, isDone) {
  const obj = {
    text,
    iconClass,
    isDone,
  };
  const todoList = getLocalStorageTodos();
  todoList.push(obj);
  localStorage.setItem("todo", JSON.stringify(todoList));
}
function getTodo() {
  const todoList = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
  todoList.map((todo) => {
    addItem(todo.text, todo.iconClass, false);
  });
}

function getLocalStorageTodos() {
  const todoList = localStorage.getItem("todo");
  if (todoList) {
    return JSON.parse(localStorage.getItem("todo"));
  } else {
    return [];
  }
}
