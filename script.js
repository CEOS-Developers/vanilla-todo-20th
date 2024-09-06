//😍CEOS 20기 프론트엔드 파이팅😍

document.addEventListener("DOMContentLoaded", function () {
    const today = new Date(); // 현재 날짜와 시간을 가져오는 Date 객체
    const options = { month: "long", day: "numeric", weekday: "long" };
    // 날짜, 요일 등 포맷 시 month와 weekday는 긴 형식으로 (9월, 목요일) day는 숫자 형식 (5, 25)

    const formattedDate = today.toLocaleDateString("ko-KR", options); // options 형식의 한국어 날짜
    document.querySelector(".Date").textContent = formattedDate;
    // .Date 요소의 textcontent를 formattedDate으로 설정
});