export default class ToDoList {
  constructor(tasks) {
    this.addButton = document.querySelector('[data-task="add"]');
    this.clearButton = document.querySelector('[data-task="clear"]');
    this.error = document.querySelector('[data-task="error"]');
    this.input = document.querySelector('[data-task="input"]');
    this.info = document.querySelector('[data-task="info"]');

    // Local onde irão ser armazenadas as tasks da to-do-list
    this.tasks = document.querySelector(tasks);
    this.completeTasks = JSON.parse(localStorage.getItem('infoData')) || 0;

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.clearTasks = this.clearTasks.bind(this);
  }

  loadData() {
    const tasksData = localStorage.getItem('tasksData');
    this.tasks.innerHTML = JSON.parse(tasksData);
    this.info.innerHTML = this.completeTasks;

    if (this.tasks.childElementCount > 0) {
      this.addRemoveButtonsEvent();
      this.addCheckBoxesEvent();
    }
  }

  saveData() {
    localStorage.setItem('tasksData', JSON.stringify(this.tasks.innerHTML));
    localStorage.setItem('infoData', JSON.stringify(this.completeTasks));
  }

  addTask() {
    const task = this.input.value;

    if (!task) {
      this.error.classList.add('active');
      this.error.innerText = '*INSIRA UMA TAREFA*';
    } else {
      this.error.classList.remove('active');
      this.tasks.innerHTML += `<div class='task'><input type="checkbox" data-task="checkbox">  <h1>${task}</h1> <button data-task='remove' class='removeButton '>X</button> </div>`;

      this.saveData();
      this.addRemoveButtonsEvent();
      this.addCheckBoxesEvent();
    }

    this.input.value = '';
  }

  clearTasks() {
    if (this.tasks.children.length === 0) {
      this.error.classList.add('active');
      this.error.innerText = '*SEM TAREFAS PARA REMOVER*';
    }

    if (this.tasks.children.length > 0) {
      this.tasks.innerHTML = '';
      localStorage.clear();
    }
  }

  updateInfo() {
    this.info.innerText = this.completeTasks;
    this.saveData();
  }

  updateTask({ currentTarget: taskCheckBox }) {
    const taskText = taskCheckBox.parentElement.children[1];

    if (taskCheckBox.checked) {
      taskText.style.textDecoration = 'line-through';
      taskCheckBox.setAttribute('checked', '');
      ++this.completeTasks;
    }

    if (!taskCheckBox.checked) {
      taskText.style.textDecoration = 'none';
      taskCheckBox.removeAttribute('checked');
      --this.completeTasks;
    }

    this.updateInfo();
  }

  addCheckBoxesEvent() {
    this.checkBoxes = document.querySelectorAll('[data-task="checkbox"]');
    this.checkBoxes.forEach((checkBox) => checkBox.addEventListener('change', this.updateTask));
  }

  removeTask({ currentTarget }) {
    currentTarget.parentElement.remove();
    --this.completeTasks;
    console.log(this.completeTasks);
    this.updateInfo();
  }

  addRemoveButtonsEvent() {
    this.removeButtons = document.querySelectorAll('[data-task="remove"]');
    this.removeButtons.forEach((button) => button.addEventListener('click', this.removeTask));
  }

  addButtonsEvents() {
    this.addButton.addEventListener('click', this.addTask);
    this.clearButton.addEventListener('click', this.clearTasks);
  }

  init() {
    this.loadData();
    this.addButtonsEvents();
  }
}
