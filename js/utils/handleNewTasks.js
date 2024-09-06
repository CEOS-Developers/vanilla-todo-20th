import { todosWrapper } from "../constants/document.js";
import { handleDeleteStoreTask } from "./storeTask.js";

//element 추가 함수
export function handleNewTask(todoId, todoValue) {
  let doneBtnContainer = document.createElement("div");
  doneBtnContainer.className = "doneBtnContainer";

  let doneBtn = document.createElement("input");
  doneBtn.id = todoId;
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
  deleteBtn.addEventListener("click", () => {
    onetodoWrapper.remove();
    handleDeleteStoreTask(todoId);
  });

  let onetodoWrapper = document.createElement("li");
  onetodoWrapper.className = "onetodoWrapper";

  let todoContent = document.createElement("p");
  todoContent.className = "todoContent";

  onetodoWrapper.append(doneBtnContainer, todoContent, deleteBtn);

  //할일 입력됨
  todoContent.textContent = todoValue;

  doneBtn.addEventListener("change", () => {
    if (doneBtn.checked) {
      todoContent.style.textDecoration = "line-through";
    } else {
      todoContent.style.textDecoration = "none";
    }
  });
  todosWrapper.append(onetodoWrapper);
}
