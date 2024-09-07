const date = document.getElementById('date');
const todoCount = document.getElementById('todo-count');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const todoInput = document.querySelector('#todo-form input')

// 날짜 함수
function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `⊹ ⋆ ${year}. ${month}. ${day}. ⋆ ⊹`
}
date.innerText = getDate();

// 개수 함수
function getTodoCount() {
  totalTodo = todos.length;
  doneTodo = todos.filter(todo => todo.done).length;
  todoCount.innerText = `${doneTodo} / ${totalTodo}`;
}

// 로컬 스토리지에 저장하기, 불러오기
let todos = [];

try {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
} catch (e) {
  todos = [];
}
todos = todos.filter(todo => todo.date === getDate());

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// let todos = (JSON.parse(localStorage.getItem('todos') ?? [])).filter(todo => todo.date === getDate());
// function saveTodos() {
//   localStorage.setItem('todos', JSON.stringify(todos))
// }; <-- JSON 오류가 났던 코드입니다. 왜 이 코드로 하면 오류가 났는지 알아가는 과정에서 새로 배운 것들이 있어 코드 리뷰하시는 분도 보시라고 남겨 놓습니다.

// todo 정렬 함수 (완료된 일은 밑으로 배치)
function sortTodo() {
  todos.sort((a, b) => a.done - b.done);
}

// todo 렌더링 함수
function renderTodo() {
  todoList.innerHTML = '';
  sortTodo();
  todos.forEach(todo => showTodo(todo));
  getTodoCount();
}

// todo 항목 표시 함수
function showTodo(todo){
  const li = document.createElement('li');
  li.id = todo.id;

  // todo 내용
  const span = document.createElement('span');
  span.innerText = todo.text;
  
  // 완료 버튼
  todo.done && span.classList.add('done');
  const doneBtn = document.createElement('button');

  doneBtn.innerText = todo.done === true ? '♥' : '♡';
  doneBtn.onmouseenter = () => doneBtn.innerText = '♥';
  doneBtn.onmouseleave = () => doneBtn.innerText = todo.done ? '♥' : '♡';

  doneBtn.classList.add('doneBtn');
  doneBtn.addEventListener('click', () => {
    span.classList.toggle('done');
    todo.done = !todo.done;
    saveTodos();
    renderTodo();
  })
  
  // 삭제 버튼
  const delBtn = document.createElement('button');
  delBtn.innerText = '×';
  delBtn.classList.add('delBtn');
  delBtn.addEventListener('click', deleteTodo)

  li.appendChild(doneBtn);
  li.appendChild(span);
  li.appendChild(delBtn);

  todoList.appendChild(li);
}

// 할 일 추가 함수
todoForm.addEventListener('submit', addTodo);

function addTodo(e){

  e.preventDefault();
  const newTodo = todoInput.value;

  if(newTodo===''){
    alert("할 일을 입력해주세요!");
  }

  else{
    const newTodoObj = {
      id : Date.now(),
      text : newTodo,
      done : false,
      date : getDate()
    }

    todos.push(newTodoObj);
    saveTodos();
    showTodo(newTodoObj);
    renderTodo();

    todoInput.value = '';
  }
};


// 할 일 삭제 함수
function deleteTodo(e){
  const li = e.target.parentElement;
  li.remove();

  todos = todos.filter(todo => todo.id !== parseInt(li.id));
  saveTodos();
  renderTodo();
};

renderTodo();