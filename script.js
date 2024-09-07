// 날짜 포맷
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return `${year}년 ${month}월 ${day}일`;
}

// 요일 포맷
function formatDay(date) {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return days[date.getDay()];
}

function dateDisplay(date) {
  document.querySelector('.date').innerHTML = formatDate(date);
  document.querySelector('.day').innerHTML = formatDay(date);
}

// 투두 렌더링
function loadTodoList(date) {
  const todoList = getTodoList(date);
  const todoListContainer = document.querySelector('.todoList');
  todoListContainer.innerHTML= '';

  todoList.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    const checkedStatus = todo.completed ? 'checked' : 'unchecked';
    const textColor = todo.completed ? '#C0C0C0' : '#000000';

    todoItem.innerHTML = `
      <img src="./src/${checkedStatus}.svg" class="toggleComplete">
      <span style="color: ${textColor};">${todo.text}</span>
      <img src="./src/deleteBtn.svg" class="deleteBtn" style="display: none;">
    `;

    // 투두 완료
    todoItem.querySelector('.toggleComplete').addEventListener('click', () => {
      todo.completed = !todo.completed;
      saveTodoList(date, todoList);
      loadTodoList(date);
    });

    // 삭제 버튼
    todoItem.addEventListener('mouseover', () => {
      todoItem.querySelector('.deleteBtn').style.display = 'inline';
    });

    todoItem.addEventListener('mouseout', () => {
      todoItem.querySelector('.deleteBtn').style.display = 'none';
    });

    todoItem.querySelector('.deleteBtn').addEventListener('click', () => {
      todoList.splice(index, 1);
      saveTodoList(date, todoList);
      loadTodoList(date);
    });

    todoListContainer.appendChild(todoItem);
  });

  updateLeftNum(todoList)
}

// 투두 추가
function addTodoItem(date, todoText) {
  if (!todoText) return;

  const todoList = getTodoList(date);
  const newTodo = { text: todoText, completed: false };
  todoList.push(newTodo);
  saveTodoList(date, todoList);
  loadTodoList(date);
}

document.querySelector('#inputForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const todoInput = document.querySelector('.todoInput');
  addTodoItem(currentDate, todoInput.value);
  todoInput.value = '';
});

// 남은 할 일 개수
function updateLeftNum(todoList) {
  const leftNum = todoList.filter(todo => !todo.completed).length;
  document.querySelector('.leftNum').innerHTML = `할 일 ${leftNum}개`;
}

// 날짜 이동
let currentDate = new Date();
dateDisplay(currentDate);
loadTodoList(currentDate);

document.querySelector('img[src*="toYesterday"]').addEventListener('click', () => {
  currentDate.setDate(currentDate.getDate() - 1);
  dateDisplay(currentDate);
  loadTodoList(currentDate);
});

document.querySelector('img[src*="toTomorrow"]').addEventListener('click', () => {
  currentDate.setDate(currentDate.getDate() + 1);
  dateDisplay(currentDate);
  loadTodoList(currentDate);
});

// local storage 관련 코드
function getTodoList(date) {
  const storedTodos = localStorage.getItem(date.toDateString());
  return storedTodos ? JSON.parse(storedTodos) : [];
}

function saveTodoList(date, todoList) {
  localStorage.setItem(date.toDateString(), JSON.stringify(todoList));
}