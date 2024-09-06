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
    document.querySelector('.date').textContent = formatDate(date);
    document.querySelector('.day').textContent = formatDay(date);
  }
  
let currentDate = new Date();
dateDisplay(currentDate);
  
// 어제 날짜로 이동
document.querySelector('img[src*="toYesterday"]').addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    dateDisplay(currentDate);
    loadTodoList(currentDate);
});
  
// 내일 날짜로 이동
document.querySelector('img[src*="toTomorrow"]').addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1);
    dateDisplay(currentDate);
    loadTodoList(currentDate);
});
  
function loadTodoList(date) {
    const todoList = document.querySelector('.todoList');
    todoList.textContent = '';
  }
  