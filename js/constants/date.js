//헤더에 해당되는 날짜 상수화 파일입니다.

// 오늘 날짜 가져오기
const currentDate = new Date();

//각각의 달, 일 가져오기
export const todayMonth = currentDate.getMonth() + 1;
export const todayDAY = currentDate.getDate() + 1;
