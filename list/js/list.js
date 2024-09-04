import { Task } from "./taskClass.js";

const emptyContainer = document.querySelector(".empty-tasks-container");
const notCompletedContainer = document.querySelector(".not-completed-container");
const completedContainer = document.querySelector(".completed-container");
const createTaskContainer = document.querySelector(".create-task-container");

document.getElementById("add-task").addEventListener("click", () =>  {
    status = 1;
    openCreateTask();

    // const newTask = new Task("b");
    // addTask(newTask);
    // checkContainers();
});

document.getElementById("submit-create").addEventListener("click", () => {
    const taskText = document.getElementById("task-text").value;

    if (taskText !== "") {
        addTask(new Task(taskText));

        document.getElementById("task-text").value = "";
        status = 0;
        closeCreateTask();
    }
    else {
        alert("Введите текст!");
    }

});

document.getElementById("cancel").addEventListener("click", () => {
    status = 0;
    document.getElementById("task-text").value = "";
    closeCreateTask();
});

let completedTasks = [];
let uncompletedTasks = [new Task("a")];

let status = 0;

function openCreateTask() {
    createTaskContainer.style.display = "block";
}

function closeCreateTask() {
    createTaskContainer.style.display = "none";
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

function addTask(task) {
    uncompletedTasks.push(task);

    const newListItem = document.createElement('li');
    newListItem.innerHTML = `<span>${task.getDescription()}</span>
    <span>
        <button>Изменить</button>
        <button>Удалить</button>
        <input type="checkbox"></input>
    </span>`;
    newListItem.className = "task";

    document.querySelector(".not-completed-container").appendChild(newListItem);
    // notCompletedContainer.insertAdjacentElement("beforeend", "<p>aawdf</p>");
}

// отображение списка дел
function setTasks() {
    for (const elem of uncompletedTasks) {
        const newListItem = document.createElement('li');
        newListItem.textContent = elem.getDescription();
        newListItem.className = "task";

        document.querySelector(".not-completed-container").appendChild(newListItem);
    }

    for (const elem of completedTasks) {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = `<s>${elem.getDescription()}</s>`;
        newListItem.className = "task";

        document.querySelector(".completed-container").appendChild(newListItem);
    }
}

checkContainers();
setTasks();
