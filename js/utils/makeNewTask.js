import { newTaskBtn, todolistWrapper } from "../constants/document.js";
import { newTodoInputContainer } from "../constants/newTask.js";

export function onClickNewTaskBtn() {
  newTaskBtn.addEventListener("click", () => {
    todolistWrapper.appendChild(newTodoInputContainer);
  });
}
