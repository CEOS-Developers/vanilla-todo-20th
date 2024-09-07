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

// 요소 추가하기
document
  .getElementById('todoContainer')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const inputField = document.getElementById('inputValue');
    const inputValue = inputField.value;

    if (inputValue) {
      createToDoItem(inputValue);
      inputField.value = ''; // 입력 필드 초기화
    }
  });

var createToDoItem = (value) => {
  const newToDo = document.createElement('li');
  const toDoTitle = document.createElement('div');
  toDoTitle.textContent = value;
  toDoTitle.classList.add('toDo');
  newToDo.classList.add('toDoItem');

  newToDo.appendChild(createIsCompleteButton());
  newToDo.appendChild(toDoTitle);
  newToDo.appendChild(createDeleteButton(newToDo));

  toDoList.appendChild(newToDo);
};

const createIsCompleteButton = () => {
  const icon = document.createElement('span');
  icon.classList.add('material-icons');
  icon.textContent = 'radio_button_unchecked';

  icon.onclick = function () {
    console.log('hello');
    if (icon.textContent === 'check_circled') {
      icon.textContent = 'radio_button_unchecked';
    } else {
      icon.textContent = 'check_circled';
    }
  };

  return icon; // 아이콘 반환
};
const createDeleteButton = (item) => {
  const deleteButton = document.createElement('div');

  deleteButton.textContent = '삭제';
  deleteButton.classList.add('mainButton');
  deleteButton.onclick = function () {
    toDoList.removeChild(item);
  };

  return deleteButton; // 버튼 반환
};

// 요소 삭제하기
