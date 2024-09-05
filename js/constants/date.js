//헤더에 해당되는 날짜 상수화 파일입니다.

// 오늘 날짜 가져오기
const currentDate = new Date();

//상수화
export const TODAY_MONTH = currentDate.getMonth() + 1;
export const TODAY_DAY = currentDate.getDate() + 1;
