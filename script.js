// 현재 시간 업데이트 함수
const updateTime = () => {
  const today = document.querySelector(".today");
  const now = new Date();
  today.innerHTML = now.toLocaleString();
};

// 1초마다 호출
setInterval(updateTime, 1000);

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

  // 할 일 체크 버튼
  const todoCheckImg = document.createElement("img");
  todoCheckImg.setAttribute("src", "images/empty_checkbox.png");
  todoCheck.appendChild(todoCheckImg);
  todoCheck.setAttribute("class", "todo-check");
  todoCheck.addEventListener("click", todoToDid);

  // 할 일 삭제 버튼
  const todoDelImg = document.createElement("img");
  todoDelImg.setAttribute("src", "images/delete_btn.png");
  todoDel.appendChild(todoDelImg);
  todoDel.setAttribute("class", "todo-del");
  todoDel.addEventListener("click", deleteTodoItem);

  todoItem.className = "todo-item";
  todoItem.appendChild(todoCheck);
  todoItem.appendChild(todoText);
  todoItem.appendChild(todoDel);

  todoList.appendChild(todoItem);

  document.querySelector(".todoList").appendChild(todoList);
  document.querySelector(".input").value = "";
};

const deleteTodoItem = (e) => {
  const target = e.target.parentNode.parentNode.parentNode;
  console.log(target);
  document.querySelector(".todoList").removeChild(target);
};

// 할 일에서 한 일로 옮기기
const todoToDid = (e) => {
  const target = e.target.parentNode.parentNode.parentNode;
  const todoText = target.querySelector(".todo-text").innerText;
  deleteTodoItem(e);
  printDidItem(todoText);
};

// 한 일
const printDidItem = (text) => {
  const didList = document.createElement("li");
  const didItem = document.createElement("div");
  const didCheck = document.createElement("button");
  const didDel = document.createElement("button");

  const didText = document.createElement("span");
  didText.innerText = text;
  didText.className = "did-text";

  // 한 일 체크 버튼
  const didCheckImg = document.createElement("img");
  didCheckImg.setAttribute("src", "images/full_checkbox.png");
  didCheck.appendChild(didCheckImg);
  didCheck.setAttribute("class", "todo-check");
  didCheck.addEventListener("click", didToTodo);

  // 한 일 삭제 버튼
  const didDelImg = document.createElement("img");
  didDelImg.setAttribute("src", "images/delete_btn.png");
  didDel.appendChild(didDelImg);
  didDel.setAttribute("class", "todo-del");
  didDel.addEventListener("click", deleteDidItem);

  didItem.className = "todo-item";
  didItem.appendChild(didCheck);
  didItem.appendChild(didText);
  didItem.appendChild(didDel);

  didList.appendChild(didItem);

  document.querySelector(".didList").appendChild(didList);
};

const deleteDidItem = (e) => {
  const target = e.target.parentNode.parentNode.parentNode;
  console.log(target);
  document.querySelector(".didList").removeChild(target);
};

const didToTodo = (e) => {
  const target = e.target.parentNode.parentNode.parentNode;
  const didText = target.querySelector(".did-text").innerText;
  deleteDidItem(e);
  printTodo(didText);
};

init();
