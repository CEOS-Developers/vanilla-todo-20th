//기존 추가되어 있던 할일
import { todolistWrapper } from "./document.js";

//체크박스 버튼생성
let doneBtnContainer = document.createElement("div");
doneBtnContainer.className = "doneBtnContainer";

let doneBtn = document.createElement("input");
doneBtn.id = "doneBtnId";
doneBtn.type = "checkbox";

let doneBtnLabel = document.createElement("label");
doneBtnLabel.className = "doneBtnLabel";
doneBtnLabel.htmlFor = "doneBtnId";

doneBtnContainer.append(doneBtn, doneBtnLabel);

//없애는 이모티콘
let deleteBtn = document.createElement("button");
deleteBtn.className = "deleteBtn";
deleteBtn.type = "button";
deleteBtn.textContent = "🗑️";

let onetodoWrapper = document.createElement("li");
onetodoWrapper.className = "onetodoWrapper";
onetodoWrapper.append(doneBtnContainer, deleteBtn);

const todosWrapper = document.createElement("ul");
todosWrapper.className = "todosWrapper";
todosWrapper.append(onetodoWrapper);

function addTodo() {
  todolistWrapper.append(todosWrapper);
}

export { doneBtn, deleteBtn, onetodoWrapper, todosWrapper, addTodo };
