// 현재 시간 업데이트
const updateTime = () => {
  const today = document.querySelector(".today");
  const now = new Date();
  today.innerHTML = now.toLocaleString();
};
setInterval(updateTime, 1000); // 1초마다 호출

/* 로컬 스토리지 데이터 처리 */
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

let todos = loadFromLocalStorage("todos");
let dones = loadFromLocalStorage("dones");

const initTodoList = () => {
  todos.forEach((todo) => printTodo(todo));
  dones.forEach((done) => printDidItem(done));
};

/* todo 입력, 토글, 삭제 */
const form = document.querySelector(".input-box");
const showMessage = document.querySelector(".show-input");

const init = () => {
  form.addEventListener("submit", addTodoItem);
  showMessage.addEventListener("click", toggleForm);
  initTodoList(); // 초기 로드 시 로컬 스토리지 데이터 불러오기
};

// 입력창 초기 숨김
form.style.display = "none";

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
  if (todoInput) {
    todos.push(todoInput);
    saveToLocalStorage("todos", todos); // 저장
    printTodo(todoInput);
  }
};

// 할 일 화면에 출력 함수
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

// 할 일 삭제 함수
const deleteTodoItem = (e) => {
  const target = e.target.parentNode.parentNode.parentNode;
  const text = target.querySelector(".todo-text").innerText;
  todos = todos.filter((todo) => todo !== text);
  saveToLocalStorage("todos", todos); // 업데이트
  document.querySelector(".todoList").removeChild(target);
};

// 할 일에서 한 일로 옮기기
const todoToDid = (e) => {
  const target = e.target.parentNode.parentNode.parentNode;
  const todoText = target.querySelector(".todo-text").innerText;
  deleteTodoItem(e);
  dones.push(todoText);
  saveToLocalStorage("dones", dones); // 한 일 저장
  printDidItem(todoText);
};

// 한 일 출력 함수
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

// 한 일 삭제 함수
const deleteDidItem = (e) => {
  const target = e.target.parentNode.parentNode.parentNode;
  const text = target.querySelector(".did-text").innerText;
  dones = dones.filter((done) => done !== text);
  saveToLocalStorage("dones", dones); // 업데이트
  document.querySelector(".didList").removeChild(target);
};

// 한 일을 다시 할 일로 옮기기
const didToTodo = (e) => {
  const target = e.target.parentNode.parentNode.parentNode;
  const didText = target.querySelector(".did-text").innerText;
  deleteDidItem(e);
  todos.push(didText);
  saveToLocalStorage("todos", todos); // 할 일 저장
  printTodo(didText);
};

init();
