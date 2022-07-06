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
    const cloneIcon = icon.cloneNode();
    addItem(input.value, cloneIcon);
    input.value = "";
  });
});
//! function
function addItem(text, type) {
  const todoitem = document.createElement("div");
  todoitem.classList.add("added-item");
  const classArray = type.getAttributeNode("class").value.split(" ");
  const colorBck = classArray[classArray.length - 1];
  const iconClass = [`${type.classList[1]}`, `${type.classList[2]}`];
  todoitem.classList.add(colorBck);
  if (text.trim() != "") {
    todoitem.innerHTML = `
            <li>${text}</li>
            <i class="fa-solid fa-clipboard-check"></i>
            <i class="fa-solid fa-file-pen"></i>
            <i class="fa-solid fa-trash-can"></i>
        `;
    todoitem.insertBefore(type, todoitem.childNodes[0]);
    containerTodo.appendChild(todoitem);
    saveTodo(text, iconClass);
  } else {
    alert("input something");
  }
}

function optionTodolist(event) {
  const iconTargeted = event.target.classList[1];
  const parentTargeted = event.target.parentNode;
  if (iconTargeted === "fa-clipboard-check") {
    parentTargeted.classList.toggle("completed");
  } else if (iconTargeted === "fa-trash-can") parentTargeted.remove();
  else if (iconTargeted === "fa-file-pen") {
    parentTargeted.childNodes[2].toggleAttribute("contenteditable");
    parentTargeted.classList.toggle("editting");
  }
}
function saveTodo(text, iconClass) {
  const obj = {
    text,
    iconClass,
  };
  const todoList = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
  todoList.push(obj);
  localStorage.setItem("todo", JSON.stringify(todoList));
}
function getTodo() {
  const todoList = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
  todoList.map((todo) => {
    addItem(todo.text, todo.iconClass);
  });
}
