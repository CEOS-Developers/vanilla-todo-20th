const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const todoInput = document.querySelector('#todo-form input')

todoForm.addEventListener('submit', addTodo);

// 할 일 추가 함수
function addTodo(){

  event.preventDefault();

  if(todoInput.value==''){
    alert("할 일을 입력해주세요!");
  }

  else{
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.innerText = todoInput.value;
    todoInput.value = '';

    const delBtn = document.createElement('button');
    delBtn.innerText = 'x';
    delBtn.addEventListener('click', deleteTodo)

    li.appendChild(span);
    li.appendChild(delBtn);

    todoList.appendChild(li);
  }
};


// 할 일 삭제 함수
function deleteTodo(e){
  li = e.target.parentElement;
  li.remove();
}