import { todosWrapper } from "../constants/document.js";
import { todoInput } from "../constants/newTask.js";

export function handleNewTask() {
  let doneBtnContainer = document.createElement("div");
  doneBtnContainer.className = "doneBtnContainer";

  let doneBtn = document.createElement("input");
  doneBtn.id = "doneBtnId" + Math.random();
  doneBtn.type = "checkbox";

  let doneBtnLabel = document.createElement("label");
  doneBtnLabel.className = "doneBtnLabel";
  doneBtnLabel.htmlFor = doneBtn.id;

  doneBtnContainer.append(doneBtn, doneBtnLabel);

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.type = "button";
  deleteBtn.textContent = "🗑️";
  //삭제
  deleteBtn.addEventListener("click", () => onetodoWrapper.remove());

  let onetodoWrapper = document.createElement("li");
  onetodoWrapper.className = "onetodoWrapper";

  let todoContent = document.createElement("p");
  todoContent.className = "todoContent";

  onetodoWrapper.append(doneBtnContainer, todoContent, deleteBtn);

  //할일 입력됨
  todoContent.textContent = todoInput.value;

  todoInput.value = "";
  if (doneBtn.checked) {
    todoContent.classList.add("done");
  }

  todosWrapper.append(onetodoWrapper);
}
