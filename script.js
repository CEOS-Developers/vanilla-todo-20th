const addBtn = document.querySelector('.addBtn');
const TodoInput = document.querySelector('.TodoInput');
const todoList = document.querySelector('.todoList');
const todoForm = document.getElementById('todoForm');

let todos = [];

// localStorage에서 todos 불러오기
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        todos.forEach(todo => createTodoElement(todo.text, todo.completed));
    }
}

// localStorage에 todos 저장
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(e) {
    e.preventDefault();
    
    const Todo = TodoInput.value.trim();
    
    if (Todo) {
        createTodoElement(Todo, false);
        todos.push({ text: Todo, completed: false });
        saveTodos();
        TodoInput.value = '';
    } else {
        alert('To Do를 입력하세요');
    }
}

todoForm.addEventListener('submit', addTodo);

// 투두 추가 함수
function createTodoElement(Todo, isCompleted) {
    const listItem = document.createElement('li');
    listItem.classList.add('animate-slide-down');
    
    if (isCompleted) {
        listItem.classList.add('completed');
    }
    
    // 완료 토글 아이콘
    const toggleIcon = document.createElement('img');
    toggleIcon.src = isCompleted ? './icon/checkComplete.svg' : 'https://raw.githubusercontent.com/ryu-won/vanilla-todo-20th/40e5a4dcd0113eadd85034cc953aa3fa97de4527/icon/NotCheck.svg';
    toggleIcon.alt = isCompleted ? 'Toggle Complete' : 'Toggle unComplete';
    toggleIcon.classList.add('toggle-icon');

    // 투두 텍스트
    const todoText = document.createElement('span');
    todoText.textContent = Todo;
    if (isCompleted) {
        todoText.classList.add('completed-text');
    }
    
    toggleIcon.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        todoText.classList.toggle('completed-text');
        const isNowCompleted = listItem.classList.contains('completed');
        if (isNowCompleted) {
            toggleIcon.src = './icon/checkComplete.svg';
            toggleIcon.alt = 'Toggle Complete';
        } else {
            toggleIcon.src = 'https://raw.githubusercontent.com/ryu-won/vanilla-todo-20th/40e5a4dcd0113eadd85034cc953aa3fa97de4527/icon/NotCheck.svg';
            toggleIcon.alt = 'Toggle unComplete';
        }
        // localStorage 업데이트
        const index = todos.findIndex(item => item.text === Todo);
        if (index !== -1) {
            todos[index].completed = isNowCompleted;
            saveTodos();
        }
    });
    
    // 삭제 버튼
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Del';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        listItem.classList.add('animate-fade-out');
        setTimeout(() => {
            todoList.removeChild(listItem);
            // localStorage에서 삭제
            todos = todos.filter(item => item.text !== Todo);
            saveTodos();
        }, 300);
    });
    
    listItem.appendChild(toggleIcon);
    listItem.appendChild(todoText);
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);
}

// 날짜 표시 함수
function formatDateKorean(date) {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];

    return `${month} ${day}일 ${dayOfWeek}`;
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    const todayDateElement = document.getElementById('todayDate');
    const today = new Date();
    todayDateElement.textContent = formatDateKorean(today);

    loadTodos(); // localStorage에서 todos 불러오기
});