//new Task를 눌렀을 때 나타나는 task input
const newTodoInputEmoji = document.createElement("p");
newTodoInputEmoji.textContent = "✨";

let todoInput = document.createElement("input");
todoInput.className = "todoInput";
todoInput.type = "text";

const confirmBtn = document.createElement("button");
confirmBtn.className = "confirmBtn";
confirmBtn.textContent = "확인";

let newTodoInputContainer = document.createElement("div");
newTodoInputContainer.className = "newTodoInputContainer";
newTodoInputContainer.append(newTodoInputEmoji, todoInput, confirmBtn);

export { todoInput, confirmBtn, newTodoInputContainer };
