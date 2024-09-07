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
const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();
const getDay = days[date.getDay()];

let dateElement = document.getElementById('date');

// dateElement.textContent = day;
dateElement.textContent = `${month}월 ${day}일 ${getDay}`;
