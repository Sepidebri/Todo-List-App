const addItemButton = document.querySelector(".addItemButton");
const containerType = document.querySelector(".container-type");
const icons = Array.from(document.querySelectorAll(".container-type i"));
const containerTodo = document.querySelector(".container-todo");
const input = document.querySelector("input");
//! addEventeListener
document.addEventListener("DOMContentLoaded", getTodo);
addItemButton.addEventListener("click", (ev) => {
  containerType.classList.toggle("add");
});
icons.map((icon, index) => {
  icon.addEventListener("click", (ev) => {
    containerType.classList.toggle("add");
    const iconClass = [`${icon.classList[1]}`, `${icon.classList[2]}`];
    saveTodo(input.value, iconClass, false);
    getTodo();
    input.value = "";
  });
});

//! function

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
  const todoList = getLocalStorageTodos();
  containerTodo.innerHTML = "";
  todoList.map((todo, index) => {
    renderItem(todo, index);
  });
}

function getLocalStorageTodos() {
  try {
    const todoList = localStorage.getItem("todo");
    if (todoList) {
      return JSON.parse(localStorage.getItem("todo"));
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
}

const renderItem = (props, index) => {
  const { text, iconClass, isDone } = props;
  const todoitem = document.createElement("div");
  if (isDone) {
    todoitem.classList.toggle("completed");
  }
  todoitem.classList.add("added-item");
  const colorBck = iconClass[1];
  todoitem.classList.add(colorBck);
  todoitem.innerHTML = `
    <li id="${index}-text">${text}</li>
    <i id="${index}-done" class="fa-solid fa-clipboard-check"></i>
    <i id="${index}-edit" class="fa-solid fa-file-pen"></i>
    <i id="${index}-delete" class="fa-solid fa-trash-can"></i>
  `;
  const type = document.createElement("li");
  todoitem.appendChild(type);
  type.classList.add("fa-solid");
  type.classList.add(iconClass[0]);
  type.classList.add(iconClass[1]);
  todoitem.insertBefore(type, todoitem.childNodes[0]);
  containerTodo.appendChild(todoitem);
  const doneButton = document.getElementById(`${index}-done`);
  const deleteButton = document.getElementById(`${index}-delete`);
  doneButton.addEventListener("click", setIsDone);
  deleteButton.addEventListener("click", deleteTodo);
  const editButton = document.getElementById(`${index}-edit`);
  editButton.addEventListener("click", editTodo);
};

function setIsDone(e) {
  try {
    const id = findIdFromDashedString(e.target.id);
    const todoItems = getLocalStorageTodos();
    todoItems[id].isDone = !todoItems[id].isDone;
    setLocalStorageTodos(todoItems);
    e.target.parentNode.classList.toggle("completed");
  } catch (e) {}
}

function deleteTodo(e) {
  try {
    const id = findIdFromDashedString(e.target.id);
    const todoItems = getLocalStorageTodos();
    todoItems.splice(id, 1);
    setLocalStorageTodos(todoItems);
    e.target.parentNode.remove();
  } catch (e) {}
}

function editTodo(e) {
  try {
    const parentTargeted = e.target.parentNode;
    const id = findIdFromDashedString(e.target.id);
    const todoItems = getLocalStorageTodos();
    parentTargeted.childNodes[2].toggleAttribute("contenteditable");
    parentTargeted.classList.toggle("editting");
    todoItems[id].text = parentTargeted.childNodes[2].textContent;
    const editAttr =
      parentTargeted.childNodes[2].getAttribute("contenteditable");
    if (editAttr === null) {
      setLocalStorageTodos(todoItems);
    }
  } catch (e) {}
}

function deleteTodo(e) {
  const iconTargeted = e.target.classList[1];
  const parentTargeted = e.target.parentNode;
  const id = findIdFromDashedString(e.target.id);
  const todoItems = getLocalStorageTodos();
  parentTargeted.remove();
  todoItems.splice(id, 1);
  setLocalStorageTodos(todoItems);
}

function setLocalStorageTodos(todoLists) {
  try {
    localStorage.setItem("todo", JSON.stringify(todoLists));
    getTodo();
  } catch (e) {
    console.log(e);
  }
}

function findIdFromDashedString(string) {
  const dashIndex = string.indexOf("-");
  return parseInt(string.substring(0, dashIndex));
}
