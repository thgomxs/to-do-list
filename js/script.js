let div = document.getElementById("tasksContainer");
let addTasks = document.getElementById("addTasks");
let removeTasks = document.getElementById("removeTasks");
let errorMsg = document.getElementById("errorMsg");
let input = document.getElementById("inputTask");
let tasksQnt = document.getElementsByClassName("taskContent");

onload = function () {
    let dDado = localStorage.getItem("divDado");
    let cDado = JSON.parse(dDado);

    div.innerHTML = cDado;

    let removeButton = document.getElementsByClassName("removeButton");
    for (let rB of removeButton) {
        rB.addEventListener("click", removeTask);
    }
};

function addTask() {
    let valor = input.value;

    if (valor === "" || valor === " ") {
        errorMsg.style.visibility = "visible";
        errorMsg.style.opacity = "100%";
        errorMsg.innerText = "*INSIRA UMA TAREFA*";
    } else {
        errorMsg.style.opacity = "0%";
        errorMsg.style.visibility = "hidden";

        div.innerHTML = "<div class='taskContent'> <h1 id='tarefa'></h1> <button class='removeButton'>x</button> </div>" + div.innerHTML;

        let h1 = document.getElementById("tarefa");
        h1.innerText = valor;

        let divDado = JSON.stringify(div.innerHTML);

        localStorage.setItem("divDado", divDado);

        addTasks.addEventListener("click", onload());

        input.value = "";
    }
}

function removeTask() {
    let button = this;
    let remove = button.parentElement;
    remove.remove();

    let divDado = JSON.stringify(div.innerHTML);

    localStorage.setItem("divDado", divDado);
}

function removeAllTasks() {
    if (tasksQnt.length > 0) {
        console.log(tasksQnt);
        div.innerHTML = "";
        localStorage.clear();
    } else {
        errorMsg.style.visibility = "visible";
        errorMsg.style.opacity = "100%";
        errorMsg.innerText = "*SEM TAREFAS PARA REMOVER*";
    }
}

removeTasks.addEventListener("click", removeAllTasks);
addTasks.addEventListener("click", addTask);
