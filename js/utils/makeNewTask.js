import { newTaskBtn, todolistWrapper } from "../constants/document.js";
import {
  todoInput,
  confirmBtn,
  newTodoInputContainer,
} from "../constants/newTask.js";

function onClickNewTaskBtn() {
  newTaskBtn.addEventListener("click", () => {
    todolistWrapper.appendChild(newTodoInputContainer);
  });
}

function onClickConfirmBtn() {
  confirmBtn.addEventListener("click", (e) => {
    let todoInputValue = todoInput.value;
    console.log(todoInputValue);
  });
}

function newTaskFn() {
  onClickNewTaskBtn();
  onClickConfirmBtn();
}

export { newTaskFn };
