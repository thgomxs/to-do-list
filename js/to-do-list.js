export default class ToDoList {
  constructor(tasks) {
    this.addButton = document.querySelector('[data-task="add"]');
    this.clearButton = document.querySelector('[data-task="clear"]');
    this.error = document.querySelector('[data-task="error"]');
    this.input = document.querySelector('[data-task="input"]');
    this.info = document.querySelector('[data-task="info"]');

    // Local onde irão ser armazenadas as tasks da to-do-list
    this.tasksContainer = document.querySelector(tasks);

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.clearTasks = this.clearTasks.bind(this);
  }

  loadData() {
    this.tasksArray = JSON.parse(localStorage.getItem('tasksData')) || [];
    this.completeTasks = JSON.parse(localStorage.getItem('infoData')) || 0;

    this.renderTasks();
  }

  saveData() {
    localStorage.setItem('tasksData', JSON.stringify(this.tasksArray));
    localStorage.setItem('infoData', JSON.stringify(this.completeTasks));
  }

  renderTasks() {
    this.tasksContainer.innerHTML = '';

    this.tasksArray.forEach((task) => {
      this.tasksContainer.innerHTML += `<div class='task'><input type="checkbox" data-task="checkbox" ${task.status}>  <h1>${task.title}</h1> <button data-task='remove' class='removeButton '>X</button> </div>`;
    });
    this.info.innerHTML = this.completeTasks;

    this.addRemoveButtonsEvent();
    this.addCheckBoxesEvent();
  }

  // ADD TASK, REMOVE TASK E CLEAR TASKS

  addTask() {
    const task = this.input.value;

    if (!task) {
      this.error.classList.add('active');
      this.error.innerText = '*INSIRA UMA TAREFA*';
    }
    if (task) {
      this.error.classList.remove('active');
      this.tasksArray.push({
        title: task,
        status: '',
      });
      this.updateInfo();
    }

    this.input.value = '';
  }

  removeTask({ currentTarget }) {
    const taskText = currentTarget.parentElement.querySelector('h1');
    const taskCheckBox = currentTarget.parentElement.querySelector('input[type="checkbox"]');
    this.tasksArray = this.tasksArray.filter((task) => task.title !== taskText.innerText);

    if (taskCheckBox.checked) --this.completeTasks;
    this.updateInfo();
  }

  clearTasks() {
    if (this.tasksContainer.children.length === 0) {
      this.error.classList.add('active');
      this.error.innerText = '*SEM TAREFAS PARA REMOVER*';
    }

    if (this.tasksContainer.children.length > 0) {
      this.error.classList.remove('active');
      this.tasksContainer.innerHTML = '';
      this.tasksArray = [];
      this.completeTasks = 0;
      this.updateInfo();
    }
  }

  // UPDATE

  updateInfo() {
    this.info.innerText = this.completeTasks;
    this.saveData();
    this.renderTasks();
  }

  updateTask({ currentTarget: taskCheckBox }) {
    const taskText = taskCheckBox.parentElement.querySelector('h1');
    const taskIndex = this.tasksArray.findIndex((task) => task.title === taskText.innerText);

    if (taskCheckBox.checked) {
      this.tasksArray[taskIndex].status = 'checked';
      ++this.completeTasks;
    }

    if (!taskCheckBox.checked) {
      this.tasksArray[taskIndex].status = '';
      --this.completeTasks;
    }

    this.updateInfo();
  }

  // EVENTS

  addCheckBoxesEvent() {
    this.checkBoxes = document.querySelectorAll('[data-task="checkbox"]');
    this.checkBoxes.forEach((checkBox) => checkBox.addEventListener('change', this.updateTask));
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
