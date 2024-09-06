//😍CEOS 20기 프론트엔드 파이팅😍

document.addEventListener("DOMContentLoaded", function () {
    const today = new Date(); // 현재 날짜와 시간을 가져오는 Date 객체
    const options = { month: "long", day: "numeric", weekday: "long" };
    // 날짜, 요일 등 포맷 시 month와 weekday는 긴 형식으로 (9월, 목요일) day는 숫자 형식 (5, 25)

    const formattedDate = today.toLocaleDateString("ko-KR", options); // options 형식의 한국어 날짜
    document.querySelector(".Date").textContent = formattedDate;
    // .Date 요소의 textcontent를 formattedDate으로 설정
    const todoInput = document.querySelector("input"); // input 요소 가지고 오기
    const todoBox = document.querySelector(".todo-box"); // class가 .todo-box인 요소를 가지고 오기
    const submitBtn = document.getElementById("submitbtn"); // id가 submitbtn인 요소를 가지고 오기
  
    let todoList = []; // 로컬스토리지에 저장될 todo 배열

    function setting() {
      loadStorage(); // localStorage에 저장된 todoList의 todo들 불러오기
      submitBtn.addEventListener("click", function (event) {
          event.preventDefault();
          createList();
      });
  }

  function createList() {
      const newTodo = todoInput.value.trim(); /* 문자열 앞 뒤 공백을 제거하는 trim을 이용, 사용자가 input에 입력한 todo를 저장*/
      if (newTodo === "") return; /* 사용자가 입력하지 않았으면 함수 종료 */

      todoList.push({ text: newTodo, completed: false }); /* 배열에 입력 값 저장 */
      saveStorage(); /* list에 새로운 todo가 추가 됨으로써 변경되었으니 다시 localStorage에 todoList 저장 */
      displayTodo(newTodo, false); 
      todoInput.value = ""; /* 배열에 todo를 저장하고 렌더링 했다면 input을 지워서 다시 입력할 수 있도록 */
  }

  function saveStorage() {
      localStorage.setItem("todos", JSON.stringify(todoList));  /*localStorage는 문자열 형식의 데이터만 저장할 수 있기 때문에, JSON.stringify()를 사용해 자바스크립트 객체나 배열을 JSON 문자열로 변환한 후 저장. 다시 불러올 때는 JSON.parse() 이용*/
  }  /* setItem(key,value) 특정 key에 해당 value 할당 */

  function loadStorage() {
      const storedTodos = localStorage.getItem("todos"); /* 기존에 localStorage에 저장되어있던 배열을 불러오기, 만약 없다면 null이 저장 됨 */
      if (storedTodos) {
          todoList = JSON.parse(storedTodos);
          todoList.forEach((todo) => displayTodo(todo.text, todo.completed)); // todoList 배열을 순회하며 저장된 모든 todo를 화면에 렌더링
      }
  }

  function displayTodo(todoText, isCompleted) {
      const li = document.createElement("li"); // 새로운 <li>요소 생성. 하나의 todo를 나타냄

      const checkbox = document.createElement("input"); // 새로운 input 요소 checkbox 생성
      checkbox.type = "checkbox"; // 이 요소의 type = checkbox
      checkbox.classList.add("todo-checkbox"); // 스타일링을 위해 클래스 목록에 클래스 이름 추가! 즉 checkbox에 할당되는 클래스 이름이 todo-checkbox
      checkbox.checked = isCompleted; // isCompleted가 true라면 checkbox가 체크 됨

      checkbox.addEventListener("change", function () { // checkbox의 상태가 바뀔 때, 즉 checked의 속성이 변경될 때 (사용자가 체크박스를 체크하거나 해제할 때) 실행될 이벤트 핸들러
          li.querySelector("span").style.textDecoration = checkbox.checked ? "line-through" : "none";
      }); // <li> 요소의 첫 번째 <span> 요소를 찾아 스타일링. 만약 체크박스가 체크 되어있으면? 선을 긋고 해제되어 있으면 선을 없앤다!

      const todoSpan = document.createElement("span"); //<li> 요소 안에 쓰여질 텍스트를 <span> 요소로 설정
      todoSpan.classList.add("todoSpan");
      todoSpan.textContent = todoText; // 매개변수로 전달 받은 input의 text를 변수 todoSpan의 텍스트 내용으로 저장
      if (isCompleted) {
          todoSpan.style.textDecoration = "line-through";
      }

      const deleteBtn = document.createElement("button"); // 새로운 <button> 요소 생성
      deleteBtn.textContent = "삭제"; // deleteBtn의 텍스트 내용을 삭제라고 지정
      deleteBtn.classList.add("delete-btn");
      
      li.appendChild(checkbox); // 새로 만든 요소 (체크박스, 텍스트, 삭제 버튼)을 <li> 요소에 추가해서 하나의 todo 항목 완성!
      li.appendChild(todoSpan); // 할 일 텍스트를 담은 <span> 요소 추가
      li.appendChild(deleteBtn); // 삭제 버튼 추가
      todoBox.appendChild(li); // <ul> 요소를 불러 온 todoBox에 <li>들 추가
  }

  setting();
});