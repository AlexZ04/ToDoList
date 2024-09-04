import { Task } from "./taskClass.js";

const emptyContainer = document.querySelector(".empty-tasks-container");
const notCompletedContainer = document.querySelector(".not-completed-container");
const completedContainer = document.querySelector(".completed-container");
const createTaskContainer = document.querySelector(".create-task-container");
const editTaskContainer = document.querySelector(".edit-task-container");

document.getElementById("add-task").addEventListener("click", () =>  {
    openCreateTask();
});

document.getElementById("submit-create").addEventListener("click", () => {
    const taskText = document.getElementById("task-text").value;
    const isCompleted = document.getElementById("is-completed").checked;

    if (taskText !== "") {
        addTask(new Task(taskText), isCompleted);

        document.getElementById("task-text").value = "";
        document.getElementById("is-completed").checked = false;
        closeCreateTask();
    }
    else {
        alert("Введите текст!");
    }

});

document.getElementById("cancel").addEventListener("click", () => {
    document.getElementById("task-text").value = "";
    closeCreateTask();
});

document.getElementById("cancel-edit").addEventListener("click", () => {
    closeEditTask();
});

document.getElementById("submit-edit").addEventListener("click", () => {
    const newVal = document.getElementById("task-edit-text").value;
    if (newVal !== "") {
        uncompletedTasks[editingTaskInd] = new Task(newVal);
        setTasks();
        closeEditTask();
    }
    else {
        alert("Текст не может быть пустым!")
    }
})

let editingTaskInd = 0;

notCompletedContainer.onclick = function(event) {
    if (event.target.dataset.index) {
        const index = Number(event.target.dataset.index);
        const type = event.target.dataset.type;

        if (type === "remove") {
            uncompletedTasks.splice(index, 1);
            setTasks();
        }
        else if (type === "check") {
            const task = uncompletedTasks[index];
            uncompletedTasks.splice(index, 1);
            completedTasks.push(task);
            setTasks();
        }
        else if (type === "edit") {
            document.getElementById("task-edit-text").value = uncompletedTasks[index].getDescription();
            editingTaskInd = index;
            openEditTask();
        }

    }
}

completedContainer.onclick = function(event) {
    if (event.target.dataset.index) {
        const index = Number(event.target.dataset.index);
        const type = event.target.dataset.type;

        if (type === "remove") {
            completedTasks.splice(index, 1);
            setTasks();
        }
        else if (type === "check") {
            const task = completedTasks[index];
            completedTasks.splice(index, 1);
            uncompletedTasks.push(task);
            setTasks();
        }

    }
}

let completedTasks = [];
let uncompletedTasks = [new Task("a")];

function openCreateTask() {
    createTaskContainer.style.display = "block";
}

function closeCreateTask() {
    createTaskContainer.style.display = "none";
}

function openEditTask() {
    editTaskContainer.style.display = "block";
}

function closeEditTask() {
    editTaskContainer.style.display = "none";
}

function getTaskCode(task, index, completed = false) {
    let code = "";
    if (!completed) {
        code += `<span>${task.getDescription()}</span>`;
    }
    else {
        code += `<s>${task.getDescription()}</s>`;
    }

    code += "<span>";

    if (!completed) {
        code += `<button data-index="${index}" data-type="edit">Изменить</button>`
    }

    code += `<button data-index="${index}" data-type="remove">Удалить</button>`;
    
    if (!completed) {
        code += `<input type="checkbox" data-index="${index}" data-type="check"></input>`;
    } 
    else {
        code += `<input type="checkbox" checked data-index="${index}" data-type="check"></input>`;
    }
    
    code += "</span>";

    return code;
}

function addTask(task, isCompleted) {
    if (!isCompleted) {
        uncompletedTasks.push(task);
    }
    else {
        completedTasks.push(task);
    }
    
    setTasks();
}

// если никаких дел ещё не создано - написать об этом 
function checkContainers() {
    if (completedTasks.length + uncompletedTasks.length === 0) {
        notCompletedContainer.style.display = "none";
        completedContainer.style.display = "none";
        emptyContainer.style.display = "block";
    } else {
        notCompletedContainer.style.display = "block";
        completedContainer.style.display = "block";
        emptyContainer.style.display = "none";
    }
}

// отображение списка дел
function setTasks() {
    document.querySelector(".not-completed-container").innerHTML = "";
    document.querySelector(".completed-container").innerHTML = "";

    checkContainers();

    for (let i = 0; i < uncompletedTasks.length; i++) {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = getTaskCode(uncompletedTasks[i], i);
        newListItem.className = "task";

        document.querySelector(".not-completed-container").appendChild(newListItem);
    }

    for (let i = 0; i < completedTasks.length; i++) {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = getTaskCode(completedTasks[i], i, true);
        newListItem.className = "task";

        document.querySelector(".completed-container").appendChild(newListItem);
    }
}

setTasks();
