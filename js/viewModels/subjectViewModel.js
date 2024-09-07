class SubjectViewModel {
  #subjectList;
  #taskViewModel;

  constructor(taskViewModel) {
    this.#subjectList = new Map();
    STATE_LIST.forEach((state) => this.#subjectList.set(state, [])); // Init all columns
    this.#taskViewModel = taskViewModel;
  }

  /**
   * Adds a new subject to the specified state column and updates the view.
   *
   * @param {string} params.title - The title of the new subject.
   * @param {string} [params.state=OPEN] - The state column where the subject will be added. Default value is `OPEN`.
   *
   * @returns {Subject} The newly created subject.
   */
  addSubject({ title, state = OPEN }) {
    const newSubject = new Subject({ title, state });

    this.#subjectList
      .get(state) // Get the column where the subject will be inserted
      .push(newSubject);

    this.render();
    return newSubject;
  }

  /**
   * Removes a subject from the specified state column and updates the view.
   *
   * @param {string} params.targetId - The ID of the subject to be removed.
   * @param {string} params.state - The state column from which the subject will be removed.
   */
  deleteSubject({ targetId, state }) {
    // Get the column from which the subject will be removed
    const subjectList = this.#subjectList.get(state);

    // Get the index of the target subject by its ID
    const targetIndex = subjectList.findIndex(
      (subject) => subject.getId() === targetId
    );
    // Remove the target subject from the column
    subjectList.splice(targetIndex, 1);

    this.render();
  }

  /**
   * Retrieves the list of subjects for a given state.
   *
   * @param {string} state - The state for which to retrieve subjects.
   * @returns {Subject[]} - An array of subjects associated with the specified state.
   */
  #getSubjectsByState(state) {
    return this.#subjectList.get(state) || [];
  }

  /**
   * Creates and returns a form element for adding a new subject.
   *
   * @param {string} state - The state in which the new subject will be added.
   * @returns {HTMLElement} - The created form element.
   */
  #createFormElement(state) {
    const containerElement = createElement('li', {
      class: 'subject add-subject-card',
    });
    const formElement = createElement('form');
    const inputElement = createElement('input', {
      type: 'text',
      placeholder: NEW_SUBJECT_PLACEHOLDER,
      name: 'subject-title',
    });
    const buttonElement = createElement('button', {
      id: `add-subject-button-${state}`,
    });
    const iconElement = createElement('img', {
      src: 'assets/addIcon.svg',
    });

    containerElement.appendChild(formElement);
    buttonElement.appendChild(iconElement);
    formElement.append(inputElement, buttonElement);

    formElement.addEventListener('submit', (event) =>
      this.#onSubmitAddSubject({
        event,
        state,
        formElement,
        inputElement,
      })
    );

    return containerElement;
  }

  #onSubmitAddSubject({ event, state, formElement, inputElement }) {
    event.preventDefault();
    this.addSubject({ title: inputElement.value, state });
    dispatchTaskChangeEvent(formElement);
  }

  /**
   * Creates a card element for a subject.
   *
   * @param {Subject} subject - The subject object used to create the DOM element.
   * @returns {HTMLLIElement} The created element of a subject.
   */
  #createSubjectElement(subject) {
    const subjectId = subject.getId();
    const subjectElement = createElement('li', {
      class: 'subject',
      innerHTML: `
        <header>
          <h3>${subject.getTitle()}</h3>
          <button class="delete-subject-button" id="${subjectId}-delete-button">
            <img src="assets/deleteIcon.svg" />
          </button>
        </header>
        <main>
          <ol id=${`${subjectId}-task-list`} class="task-list" />
        </main>
        `,
    });

    return subjectElement;
  }

  #addSubjectEventHandler(subjectElement, subjectId, state) {
    // When a taskChange event occurs, update the subject's task list.
    subjectElement.addEventListener('taskChange', () =>
      this.#onChangeTask(subjectId, state)
    );

    // When the delete button is clicked, remove the subject from the list.
    document
      .getElementById(`${subjectId}-delete-button`)
      .addEventListener('click', () =>
        this.deleteSubject({ targetId: subjectId, state })
      );
  }

  #onChangeTask(subjectId, state) {
    /// Get the next state of the subject.
    const nextState = this.#taskViewModel.getSubjectState(subjectId);
    // Get the subject list in the current column.
    const currentColumnSubjectList = this.#subjectList.get(state);
    // Find the subject to update based on its ID
    const subjectToUpdate = currentColumnSubjectList.find(
      (currentSubject) => currentSubject.getId() === subjectId
    );
    // Update the subject's state
    subjectToUpdate.setState(nextState);

    if (state === nextState) {
      // Case #1
      // If the state is not changed, only update the task list for the subject
      this.#taskViewModel.render(subjectId);
      return;
    }

    currentColumnSubjectList.splice(
      currentColumnSubjectList.indexOf(subjectToUpdate),
      1
    );
    this.#subjectList.get(nextState).push(subjectToUpdate);

    // Case #2
    // Re-render the entire column
    this.render();
  }

  render() {
    STATE_LIST.forEach((state) => {
      const subjectListElement = document.getElementById(
        `${state}-subject-list`
      );

      // Init column
      subjectListElement.innerHTML = '';

      // Render form to add subject
      if (state === OPEN) {
        subjectListElement.appendChild(this.#createFormElement(state));
      }

      // Render subject
      this.#getSubjectsByState(state).forEach((subject) => {
        const subjectElement = this.#createSubjectElement(subject);
        subjectListElement.appendChild(subjectElement);
        this.#addSubjectEventHandler(subjectElement, subject.getId(), state);
        dispatchTaskChangeEvent(subjectElement);
      });
    });
  }
}
