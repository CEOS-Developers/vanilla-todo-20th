const form = document.querySelector(".inputBox");
const showMessage = document.querySelector(".showInput");

const init = () => {
  form.addEventListener("submit", addTodoItem);
  showMessage.addEventListener("click", toggleForm);
};

// 입력창 초기 숨김
// form.style.display = "none";

// 입력창 열고 닫는 함수
const toggleForm = () => {
  if (form.style.display === "none") {
    form.style.display = "flex";
    showMessage.innerHTML = "입력창 다시닫기";
  } else {
    form.style.display = "none";
    showMessage.innerHTML = "입력창 불러오기";
  }
};

// 할 일 추가 함수
const addTodoItem = (event) => {
  event.preventDefault();
  const todoInput = document.querySelector(".input").value;
  if (todoInput) printTodo(todoInput);
};

const printTodo = (text) => {
  const todoList = document.createElement("li");
  const todoItem = document.createElement("div");
  const todoCheck = document.createElement("button");
  const todoDel = document.createElement("button");

  // 입력한 할 일 내용
  const todoText = document.createElement("span");
  todoText.innerText = text;
  todoText.className = "todo-text";

  // 체크박스 이미지 넣기
  const todoCheckImg = document.createElement("img");
  todoCheckImg.setAttribute("src", "images/empty_checkbox.png");
  todoCheck.appendChild(todoCheckImg);
  todoCheck.setAttribute("class", "todo-check");

  const todoDelImg = document.createElement("img");
  todoDelImg.setAttribute("src", "images/delete_btn.png");
  todoDel.appendChild(todoDelImg);
  todoDel.setAttribute("class", "todo-del");

  // 할 일에서 한 일로 옮기기
  //todoCheck.addEventListener("click", TodoToDid);

  todoItem.className = "todo-item";
  todoItem.appendChild(todoCheck);
  todoItem.appendChild(todoText);
  todoItem.appendChild(todoDel);

  todoList.appendChild(todoItem);

  document.querySelector(".todoList").appendChild(todoList);
  document.querySelector(".input").value = "";
};

init();
