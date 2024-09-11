/* 날짜 및 현재 시각 */
const updateTime = () => {
  const today = document.querySelector(".today");
  const now = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  // 요일, 날짜 및 시각 포맷 적용
  today.innerHTML = now.toLocaleString("ko-KR", options);
};

updateTime();
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
  dones.forEach((done) => printItem(done, "done"));
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

// 이벤트 위임으로 버튼 클릭 처리를 위한 리스너 추가
document.querySelector(".todoList").addEventListener("click", (e) => {
  if (e.target.closest(".todo-check")) {
    completeTodo(e);
  } else if (e.target.closest(".todo-del")) {
    deleteTodoItem(e);
  }
});

document.querySelector(".doneList").addEventListener("click", (e) => {
  if (e.target.closest(".todo-check")) {
    restoreTodo(e);
  } else if (e.target.closest(".todo-del")) {
    deleteDoneItem(e);
  }
});

// 버튼 생성하기 함수
const createBtn = (src, className) => {
  const btn = document.createElement("button");
  const img = document.createElement("img");
  img.setAttribute("src", src);
  btn.appendChild(img);
  btn.setAttribute("class", className);

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
    type === "todo" ? "images/empty_checkbox.svg" : "images/full_checkbox.svg",
    "todo-check"
  );

  // 삭제 버튼 생성하기
  const deleteBtn = createBtn("images/delete_btn.svg", "todo-del");

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
  const inputElement = document.querySelector(".input");
  const todoInput = inputElement.value.trim(); // 입력값 공백 확인

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
  return array;
};

const deleteTodoItem = (e) => {
  todos = deleteItem(e, ".todo-text", todos, "todos", ".todoList");
  updateCounts();
};

const deleteDoneItem = (e) => {
  dones = deleteItem(e, ".done-text", dones, "dones", ".doneList");
  updateCounts();
};

// 할 일에서 한 일로 이동 함수
const completeTodo = (e) => {
  const target = e.target.closest("li");
  const todoText = target.querySelector(".todo-text").innerText;
  todos = deleteItem(e, ".todo-text", todos, "todos", ".todoList");
  dones.push(todoText);
  saveToLocalStorage("dones", dones); // 한 일 저장
  printItem(todoText, "done");
  updateCounts();
};

// 한 일에서 할 일로 이동 함수
const restoreTodo = (e) => {
  const target = e.target.closest("li");
  const doneText = target.querySelector(".done-text").innerText;
  dones = deleteItem(e, ".done-text", dones, "dones", ".doneList");
  todos.push(doneText);
  saveToLocalStorage("todos", todos); // 할 일 저장
  printItem(doneText, "todo");
  updateCounts();
};

/* todo 입력, 체크, 삭제 */
const form = document.querySelector(".input-box"); // 입력창 폼 요소
const showMessage = document.querySelector(".show-input"); // 입력창 열고 닫는 버튼 요소

// 입력창 토글 함수
let isFormOpen = false;

const toggleForm = () => {
  if (isFormOpen) {
    form.classList.remove("show");
    form.classList.add("hide");
    isFormOpen = false;

    showMessage.innerHTML = "입력창 불러오기";
  } else {
    form.style.display = "flex";
    form.classList.remove("hide");
    form.classList.add("show");
    isFormOpen = true;

    showMessage.innerHTML = "입력창 다시닫기";
  }
};

// 애니메이션 종료 처리하는 이벤트리스너
const handleAnimationEnd = (e) => {
  if (form.classList.contains("hide")) {
    form.style.display = "none";
    form.classList.remove("hide");
  }
};

// 이벤트 리스너 등록 및 기존 데이터 불러오기 함수
const init = () => {
  initTodoList();
  updateCounts();
  form.addEventListener("submit", addTodoItem);
  form.addEventListener("animationend", handleAnimationEnd);
  showMessage.addEventListener("click", toggleForm);
};

init();
