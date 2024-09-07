class TaskViewModel {
  #taskList;

  constructor() {
    this.#taskList = new Map();
  }

  addTask({ title, subjectId, isCompleted = false }) {
    if (!this.#taskList.has(subjectId)) {
      this.#taskList.set(subjectId, []);
    }
    this.#taskList
      .get(subjectId)
      .push(new Task({ title, isCompleted, subjectId }));
  }

  deleteTask(targetId, subjectId) {
    // Get the task list from which the task will be removed
    const taskList = this.#taskList.get(subjectId);

    // Get the index of the target task by its ID
    const targetIndex = taskList.findIndex((task) => task.getId() === targetId);

    // Remove the target task from the list
    taskList.splice(targetIndex, 1);
  }

  #getTasksBySubject(subjectId) {
    return this.#taskList.get(subjectId) || [];
  }

  #createFormElement(subjectId) {
    const formElement = createElement('form', {
      id: `${subjectId}-add-task-form`,
    });
    const inputElement = createElement('input', {
      type: 'text',
      placeholder: NEW_TASK_PLACEHOLDER,
      name: 'task-title',
    });
    const buttonElement = createElement('button', {
      innerText: '추가',
      class: 'add-task-button',
    });

    formElement.append(inputElement, buttonElement);

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!inputElement.value) {
        return;
      }

      this.addTask({ title: inputElement.value, subjectId });

      dispatchTaskChangeEvent(formElement);
    });

    return formElement;
  }

  #createTaskElement(task) {
    const taskElement = createElement('li', {
      class: 'task',
    });
    const checkboxElement = createElement('input', {
      type: 'checkbox',
      checked: task.getIsCompleted(),
      name: 'checkbox',
    });
    const titleElement = createElement('p', {
      innerText: task.getTitle(),
    });
    const deleteButtonElement = createElement('button', {
      innerText: '삭제',
    });
    if (task.getIsCompleted()) {
      taskElement.classList.toggle('isCompleted');
    }

    taskElement.append(
      checkboxElement,

      titleElement,
      deleteButtonElement
    );
    this.#addTaskEventHandler({
      task,
      taskElement,
      deleteButtonElement,
      checkboxElement,
    });

    return taskElement;
  }

  #addTaskEventHandler({
    task,
    taskElement,
    deleteButtonElement,
    checkboxElement,
  }) {
    deleteButtonElement.addEventListener('click', () => {
      this.deleteTask(task.getId(), task.getSubjectId());
      dispatchTaskChangeEvent(deleteButtonElement);
    });

    checkboxElement.addEventListener('change', (event) => {
      task.setIsCompleted(event.target.checked);
      taskElement.classList.toggle('isCompleted');

      dispatchTaskChangeEvent(checkboxElement);
    });
  }

  getSubjectState(subjectId) {
    const currentTaskList = this.#taskList.get(subjectId);
    if (!currentTaskList) {
      return OPEN;
    }

    const totalTaskCount = currentTaskList.length;
    const doneTaskCount = currentTaskList.filter((task) =>
      task.getIsCompleted()
    ).length;

    if (doneTaskCount === 0) {
      return OPEN;
    }
    if (totalTaskCount === doneTaskCount) {
      return DONE;
    }
    return IN_PROGRESS;
  }

  render(subjectId) {
    const taskListElement = document.getElementById(`${subjectId}-task-list`);
    taskListElement.innerHTML = '';

    // Render form to add task
    taskListElement.appendChild(this.#createFormElement(subjectId));

    // Render task
    this.#getTasksBySubject(subjectId).forEach((task) => {
      taskListElement.appendChild(this.#createTaskElement(task));
    });
  }
}
