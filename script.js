const addBtn = document.querySelector('.addBtn');
const TodoInput = document.querySelector('.TodoInput');
const todoList = document.querySelector('.todoList');
const todoForm = document.querySelector('.writeTodoForm');
const todoIcon = document.querySelector('.todoForm img');


function addTodo(e) {
    e.preventDefault();
    
    const Todo = TodoInput.value.trim();
    
    if (Todo) {
        createTodoElement(Todo);
        TodoInput.value = '';
    } else {
        alert('To Do를 입력하세요');
    }
}

todoForm.addEventListener('submit', addTodo);

//투두 추가 함수 
function createTodoElement(Todo) {
    const listItem = document.createElement('li');
    
    // 완료 토글 아이콘
    const toggleIcon = document.createElement('img');
    toggleIcon.src = './icon/notCheck.svg';  
    toggleIcon.alt = 'Toggle unComplete';
    toggleIcon.classList.add('toggle-icon');

    toggleIcon.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        todoText.classList.toggle('completed-text');
        if (listItem.classList.contains('completed')) {
            toggleIcon.src = './icon/checkComplete.svg';
            toggleIcon.alt = 'Toggle Complete';
        } else {
            toggleIcon.src = './icon/notCheck.svg';
            toggleIcon.alt = 'Toggle unComplete';
        }
    });
    
    // 투두 텍스트
    const todoText = document.createElement('span');
    todoText.textContent = Todo;
    
    // 삭제 버튼
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(listItem);
    });
    
    // HTML 구조에 맞게 요소 추가
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

// 페이지 로드 시 오늘 날짜 표시
document.addEventListener('DOMContentLoaded', () => {
    const todayDateElement = document.getElementById('todayDate');
    const today = new Date();
    todayDateElement.textContent = formatDateKorean(today);
});