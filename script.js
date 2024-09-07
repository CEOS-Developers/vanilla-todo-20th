//😍CEOS 20기 프론트엔드 파이팅😍

const days = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

const toDoList = document.getElementById('toDoList');

// 날짜 세팅하기
const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();
const getDay = days[date.getDay()];

let dateElement = document.getElementById('date');

dateElement.textContent = `${month}월 ${day}일 ${getDay}`;

// localStorage에 담길 투두항목
let toDos = JSON.parse(localStorage.getItem('item')) || [];

// id 생성기
const generateID = () => Math.random().toString(36).substring(2, 9);

// localStorage에 저장
const saveToDos = () => {
  localStorage.setItem('item', JSON.stringify(toDos));
};

// 투두리스트에 추가하기
document
  .getElementById('todoContainer')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const inputField = document.getElementById('inputValue');
    const toDo = inputField.value;

    if (toDo) {
      const id = generateID();
      const newToDo = { id: id, toDo: toDo };
      toDos.push(newToDo);
      saveToDos();
      createToDoItem(toDo, id);
      inputField.value = ''; // 입력 필드 초기화
    }
  });

// 투두 요소 만들기
var createToDoItem = (toDo, id) => {
  const newToDo = document.createElement('li');
  const toDoTitle = document.createElement('div');
  toDoTitle.textContent = toDo;
  toDoTitle.classList.add('toDo');
  newToDo.classList.add('toDoItem');

  newToDo.appendChild(createIsCompleteButton());
  newToDo.appendChild(toDoTitle);
  newToDo.appendChild(createDeleteButton(newToDo, id));

  toDoList.appendChild(newToDo);
};

// 투두 완료 버튼 생성
const createIsCompleteButton = () => {
  const icon = document.createElement('span');
  icon.classList.add('material-icons');
  icon.textContent = 'radio_button_unchecked';

  icon.onclick = function () {
    if (icon.textContent === 'check_circled') {
      icon.textContent = 'radio_button_unchecked';
    } else {
      icon.textContent = 'check_circled';
    }
  };

  return icon;
};

// 투두 삭제 버튼 추가
const createDeleteButton = (item, id) => {
  const deleteButton = document.createElement('div');
  console.log(id);
  deleteButton.textContent = '삭제';
  deleteButton.classList.add('mainButton');
  deleteButton.onclick = function () {
    toDoList.removeChild(item);
    console.log(id);
    toDos = toDos.filter((todo) => todo.id !== id);
    console.log(toDos);
    saveToDos();
  };

  return deleteButton;
};

// 투두 리스트 렌더링
const renderToDoList = () => {
  toDoList.textContent = '';
  toDos.forEach((item) => {
    createToDoItem(item.toDo, item.id);
  });
};

window.onload = function () {
  renderToDoList();
};
