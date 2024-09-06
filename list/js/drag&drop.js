export function uncompDragStart(event) {
    event.target.classList.add('hold');

    const tasks = document.querySelectorAll(".done-task");

    tasks.forEach((element) => (element.classList.add("shake")));
}

export function uncompDragEnd(event) {

    const tasks = document.querySelectorAll(".done-task");
    tasks.forEach((element) => (element.classList.remove("shake")));
}

export function compDragStart(event) {
    event.target.classList.add('hold');

    const tasks = document.querySelectorAll(".not-done-text");

    tasks.forEach((element) => (element.classList.add("shake")));
}

export function compDragEnd(event) {

    const tasks = document.querySelectorAll(".not-done-text");
    tasks.forEach((element) => (element.classList.remove("shake")));
}