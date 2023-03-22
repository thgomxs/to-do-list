export default class ToDoList {
  constructor(tasks) {
    this.addButton = document.querySelector('[data-task="add"]');
    this.clearButton = document.querySelector('[data-task="clear"]');
    this.error = document.querySelector('[data-task="error"]');
    this.input = document.querySelector('[data-task="input"]');

    // Local onde irão ser armazenadas as tasks da to-do-list
    this.tasks = document.querySelector(tasks);

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.clearTasks = this.clearTasks.bind(this);
  }

  loadData() {
    const tasksData = localStorage.getItem('tasksData');
    this.tasks.innerHTML = JSON.parse(tasksData);

    if (this.tasks.childElementCount > 0) this.addRemoveButtonsEvent();
  }

  saveData() {
    localStorage.setItem('tasksData', JSON.stringify(this.tasks.innerHTML));
  }

  addTask() {
    const task = this.input.value;

    if (!task) {
      this.error.classList.add('active');
      this.error.innerText = '*INSIRA UMA TAREFA*';
    } else {
      this.error.classList.remove('active');
      this.tasks.innerHTML += `<div class='task'> <h1>${task}</h1> <button data-task='remove' class='removeButton'>x</button> </div>`;

      this.saveData();
      this.addRemoveButtonsEvent();
    }

    this.input.value = '';
  }

  removeTask({ currentTarget }) {
    currentTarget.parentElement.remove();
    this.saveData();
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
