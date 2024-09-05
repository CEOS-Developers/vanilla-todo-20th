import { newTaskBtn, todolistWrapper } from "../constants/document.js";
import { confirmBtn, newTodoInputContainer } from "../constants/newTask.js";
import { handleNewTask } from "./handleNewTasks.js";

function onClickNewTaskBtn() {
  newTaskBtn.addEventListener("click", () => {
    todolistWrapper.appendChild(newTodoInputContainer);
  });
}

//확인 눌렀을 때
function onClickConfirmBtn() {
  confirmBtn.addEventListener("click", () => {
    handleNewTask();
  });
}

function newTaskFn() {
  onClickNewTaskBtn();
  onClickConfirmBtn();
}

export { newTaskFn };
