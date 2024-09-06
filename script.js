const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const todoInput = document.querySelector('#todo-form input')

// 로컬 스토리지에 저장하기, 불러오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
};

// todo 표시 함수
todos.forEach(todo => showTodo(todo));

function showTodo(todo){
  const li = document.createElement('li');
  li.id = todo.id;

  // todo 내용
  const span = document.createElement('span');
  span.innerText = todo.text;
  
  // 완료 버튼
  todo.done && li.classList.add('done');
  const doneBtn = document.createElement('button');
  doneBtn.addEventListener('click', () => {
    li.classList.toggle('done');
    todo.done = !todo.done;
    saveTodos();
  })
  
  // 삭제 버튼
  const delBtn = document.createElement('button');
  delBtn.innerText = 'x';
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
      done : false
    }

    todos.push(newTodoObj);
    saveTodos();
    showTodo(newTodoObj);

    todoInput.value = '';
  }
};


// 할 일 삭제 함수
function deleteTodo(e){
  const li = e.target.parentElement;
  li.remove();

  todos = todos.filter(todo => todo.id !== parseInt(li.id));
  saveTodos();
};