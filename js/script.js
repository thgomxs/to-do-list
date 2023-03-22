<<<<<<< HEAD
import ToDoList from './to-do-list.js';
=======
let addTasks = document.getElementById("addTasks");
let removeTasks = document.getElementById("removeTasks");
let errorMsg = document.getElementById("errorMsg");
let inputTask = document.getElementById("inputTask");
let qtdTasks = document.getElementsByClassName("task");
let tasksContent = document.getElementById("tasksContent");

onload = function () {
    let tasksData = localStorage.getItem("tasksData");

    tasksContent.innerHTML = JSON.parse(tasksData);

    let removeButton = document.getElementsByClassName("removeButton");
    for (let rB of removeButton) {
        rB.addEventListener("click", removeSingleTask);
    }
};

function addTask() {
    let task = inputTask.value;

    if (task === "" || task === " ") {
        errorMsg.style.visibility = "visible";
        errorMsg.style.opacity = "100%";
        errorMsg.innerText = "*INSIRA UMA TAREFA*";
    } else {
        errorMsg.style.opacity = "0%";
        errorMsg.style.visibility = "hidden";

        tasksContent.innerHTML =
            "<div class='task'> <h1 id='taskTitle'></h1> <button class='removeButton'>x</button> </div>" + tasksContent.innerHTML;

        let taskTitle = document.getElementById("taskTitle");
        taskTitle.innerText = task;

        localStorage.setItem("tasksData", JSON.stringify(tasksContent.innerHTML));

        addTasks.addEventListener("click", onload());

        inputTask.value = "";
    }
}

function removeSingleTask() {
    let button = this;
    let remove = button.parentElement;
    remove.remove();

    localStorage.setItem("tasksData", JSON.stringify(tasksContent.innerHTML));
}

function removeAllTasks() {
    if (qtdTasks.length > 0) {
        console.log(qtdTasks);
        tasksContent.innerHTML = "";
        localStorage.clear();
    } else {
        errorMsg.style.visibility = "visible";
        errorMsg.style.opacity = "100%";
        errorMsg.innerText = "*SEM TAREFAS PARA REMOVER*";
    }
}

removeTasks.addEventListener("click", removeAllTasks);
addTasks.addEventListener("click", addTask);
>>>>>>> 6ef45ed110d99d6048620a52de5952c4176b5b15
