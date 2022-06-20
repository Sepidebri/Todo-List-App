const addItemButton = document.querySelector(".addItemButton");
const containerType =document.querySelector(".container-type");
const icons = Array.from(document.querySelectorAll(".container-type i"));
const containerTodo = document.querySelector('.container-todo');
const input = document.querySelector('input');

addItemButton.addEventListener('click', ev =>{
    containerType.classList.toggle("add");
})
icons.map(icon =>{
    icon.addEventListener('click', ev =>{
        containerType.classList.toggle("add");
        const cloneIcon = icon.cloneNode();
        addItem(input.value, cloneIcon);
        input.value ="";
    })
})
function addItem(text, type){
    const todoitem = document.createElement("div");
    todoitem.classList.add("added-item");
    const classArray = type.getAttributeNode("class").value.split(' ');
    const colorBck = classArray[classArray.length - 1];
    todoitem.classList.add(colorBck);
    if (text.trim() != "") {
        todoitem.innerHTML = `
            <li>${text}</li>
            <i class="fa-solid fa-clipboard-check"></i>
            <i class="fa-solid fa-file-pen"></i>
            <i class="fa-solid fa-trash-can"></i>
        `;
        todoitem.insertBefore(type,todoitem.childNodes[0])
        containerTodo.appendChild(todoitem)
    } else {
        alert("input something")
    }
}
containerTodo.addEventListener("click", optionTodolist)
function optionTodolist(event) {
    const iconTargeted =event.target.classList[1];
    const parentTargeted = event.target.parentNode;
    if(iconTargeted == "fa-clipboard-check" ){
        parentTargeted.classList.toggle("completed");
    }
}