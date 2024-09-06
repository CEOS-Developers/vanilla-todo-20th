/* 날짜 및 현재 시각 */
const updateTime = () => {
  const today = document.querySelector(".today");
  const now = new Date();
  today.innerHTML = now.toLocaleString();
};
setInterval(updateTime, 1000); // 1초마다 호출

/* localStorage 데이터 처리 */

// localStorage에 항목 저장하기 함수
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// localStorage의 항목 불러오기 함수
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

let todos = loadFromLocalStorage("todos"); // 할 일 배열
let dones = loadFromLocalStorage("dones"); // 한 일 배열

// localStorage의 항목으로 초기화하기 함수
const initTodoList = () => {
  todos.forEach((todo) => printItem(todo, "todo"));
  dones.forEach((done) => printItem(done, "did"));
};

// 할 일과 한 일 개수 및 성취도 업데이트 함수
const updateCounts = () => {
  const totalCount = todos.length + dones.length;
  const doneCount = dones.length;
  const countElement = document.querySelector(".count");
  const accomplishmentElement = document.querySelector(".accomplishment");

  countElement.innerText = totalCount;
  accomplishmentElement.innerText =
    totalCount > 0 ? `${doneCount}/${totalCount}` : "0/0";
};

/* 공용 함수 */
// 버튼 생성하기 함수
const createBtn = (src, className, clickHandler) => {
  const btn = document.createElement("button");
  const img = document.createElement("img");
  img.setAttribute("src", src);
  btn.appendChild(img);
  btn.setAttribute("class", className);
  btn.addEventListener("click", clickHandler);

  return btn;
};

// 항목 출력하기 함수
const printItem = (text, type) => {
  const list = document.querySelector(`.${type}List`);
  const item = document.createElement("li");
  const itemContent = document.createElement("div");
  const itemText = document.createElement("span");
  itemText.innerText = text;
  itemText.className = `${type}-text`;

  // 체크 버튼 생성하기
  const checkBtn = createBtn(
    type === "todo" ? "images/empty_checkbox.png" : "images/full_checkbox.png",
    "todo-check",
    type === "todo" ? todoToDid : didToTodo
  );

  // 삭제 버튼 생성하기
  const deleteBtn = createBtn(
    "images/delete_btn.png",
    "todo-del",
    type === "todo" ? deleteTodoItem : deleteDidItem
  );

  // 항목 구성하기
  itemContent.className = "todo-item";
  itemContent.appendChild(checkBtn);
  itemContent.appendChild(itemText);
  itemContent.appendChild(deleteBtn);

  item.appendChild(itemContent);
  list.appendChild(item);
};

// 할 일 추가하기 함수
const addTodoItem = (event) => {
  event.preventDefault();
  const todoInput = document.querySelector(".input").value; // 입력값
  if (todoInput) {
    todos.push(todoInput);
    saveToLocalStorage("todos", todos); // 업데이트된 todos 배열을 localStorage에 저장
    printItem(todoInput, "todo");
    document.querySelector(".input").value = ""; // 입력창 초기화
    updateCounts();
  }
};

// 항목 삭제하기 함수
const deleteItem = (e, classSelector, array, key, listSelector) => {
  const target = e.target.closest("li");
  const text = target.querySelector(classSelector).innerText;
  array = array.filter((item) => item !== text);
  saveToLocalStorage(key, array);
  document.querySelector(listSelector).removeChild(target);
  updateCounts();
  return array;
};

const deleteTodoItem = (e) => {
  todos = deleteItem(e, ".todo-text", todos, "todos", ".todoList");
  updateCounts();
};

const deleteDidItem = (e) => {
  dones = deleteItem(e, ".did-text", dones, "dones", ".didList");
  updateCounts();
};

// 할 일에서 한 일로 이동 함수
const todoToDid = (e) => {
  const target = e.target.closest("li");
  const todoText = target.querySelector(".todo-text").innerText;
  todos = deleteItem(e, ".todo-text", todos, "todos", ".todoList");
  dones.push(todoText);
  saveToLocalStorage("dones", dones); // 한 일 저장
  printItem(todoText, "did");
  updateCounts();
};

// 한 일에서 할 일로 이동 함수
const didToTodo = (e) => {
  const target = e.target.closest("li");
  const didText = target.querySelector(".did-text").innerText;
  dones = deleteItem(e, ".did-text", dones, "dones", ".didList");
  todos.push(didText);
  saveToLocalStorage("todos", todos); // 할 일 저장
  printItem(didText, "todo");
  updateCounts();
};

/* todo 입력, 체크, 삭제 */
const form = document.querySelector(".input-box"); // 입력창 폼 요소
const showMessage = document.querySelector(".show-input"); // 입력창 열고 닫는 버튼 요소

// 입력창 열고 닫기 함수
const toggleForm = () => {
  form.style.display = form.style.display === "none" ? "flex" : "none";
  showMessage.innerHTML =
    form.style.display === "none" ? "입력창 불러오기" : "입력창 다시닫기";
};

// 이벤트 리스너 등록 및 기존 데이터 불러오기 함수
const init = () => {
  form.addEventListener("submit", addTodoItem);
  showMessage.addEventListener("click", toggleForm);
  initTodoList();
  updateCounts();
};

init();
