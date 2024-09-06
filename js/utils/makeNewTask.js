import { newTaskBtn, todolistWrapper } from "../constants/document.js";
import { confirmBtn, newTodoInputContainer } from "../constants/newTask.js";
import { handleNewTask } from "./handleNewTasks.js";
import { todoInput } from "../constants/newTask.js";
import { handleStoreTask } from "./storeTask.js";

//NewTask 버튼 눌렀을 때
function onClickNewTaskBtn() {
  newTaskBtn.addEventListener("click", () => {
    todolistWrapper.appendChild(newTodoInputContainer);
  });
}

//확인 눌렀을 때
function onClickConfirmBtn() {
  confirmBtn.addEventListener("click", (e) => {
    let todoId = Math.random();
    handleNewTask(todoId, todoInput.value);
    handleStoreTask(todoId, todoInput.value);
    todoInput.value = "";
  });
}

function newTaskFn() {
  onClickNewTaskBtn();
  onClickConfirmBtn();
}

export { newTaskFn };
