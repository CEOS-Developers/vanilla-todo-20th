class Subject {
  #title;
  #state;
  #id;

  constructor({ title = NEW_SUBJECT_NAME, state = OPEN }) {
    this.#title = title;
    this.#state = state;
    this.#id = getRandomId();
  }

  setState(state) {
    this.#state = state;
  }

  getTitle() {
    return this.#title;
  }

  getState() {
    return this.#state;
  }

  getId() {
    return this.#id;
  }
}
