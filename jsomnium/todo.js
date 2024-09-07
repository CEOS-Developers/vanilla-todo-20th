// 날짜 출력
const currentDateElement = document.getElementById('currentDate');
const today = new Date();
const days = ['일', '월', '화', '수', '목', '금', '토'];
currentDateElement.textContent = `${today.getMonth() + 1}월 ${today.getDate()}일 ${days[today.getDay()]}요일`;

// 할 일 추가 기능
const addButton = document.getElementById('addButton');
const newTodoInput = document.getElementById('newTodo');
const todoList = document.getElementById('todoList');

addButton.addEventListener('click', addTodo);

function addTodo() {
    const newTodo = newTodoInput.value.trim();
    if (newTodo) {
        const todoItem = document.createElement('li');
        const textNode = document.createTextNode(newTodo);
        const removeButton = document.createElement('button');
        removeButton.textContent = '삭제';
        removeButton.addEventListener('click', () => {
            todoList.removeChild(todoItem);
        });

        todoItem.appendChild(textNode);
        todoItem.appendChild(removeButton);
        todoList.appendChild(todoItem);

        newTodoInput.value = '';
    }
}