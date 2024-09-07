class Task {
  #title;
  #id;
  #isCompleted;
  #subjectId;

  constructor({ title = NEW_TASK_NAME, isCompleted = false, subjectId }) {
    this.#title = title;
    this.#id = getRandomId();
    this.#isCompleted = isCompleted;
    this.#subjectId = subjectId;
  }

  setIsCompleted(isCompleted) {
    this.#isCompleted = isCompleted;
  }

  getTitle() {
    return this.#title;
  }

  getId() {
    return this.#id;
  }

  getIsCompleted() {
    return this.#isCompleted;
  }

  getSubjectId() {
    return this.#subjectId;
  }
}
