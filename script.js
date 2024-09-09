//😍CEOS 20기 프론트엔드 파이팅😍

document.addEventListener("DOMContentLoaded", function () {
    const today = new Date(); // 현재 날짜와 시간을 가져오는 Date 객체
    const options = { month: "long", day: "numeric", weekday: "long" };
    // 날짜, 요일 등 포맷 시 month와 weekday는 긴 형식으로 (9월, 목요일) day는 숫자 형식 (5, 25)

    const formattedDate = today.toLocaleDateString("ko-KR", options); // options 형식의 한국어 날짜
    document.querySelector(".date").textContent = formattedDate;
    // .Date 요소의 textcontent를 formattedDate으로 설정
  
    const todoInput = document.querySelector("input"); // input 요소 가지고 오기
    const todoBox = document.querySelector(".todoBox"); // class가 .todo-box인 요소를 가지고 오기
    const submitBtn = document.getElementById("submitBtn"); // id가 submitbtn인 요소를 가지고 오기
    const completedCountElem = document.querySelector(".completedCount"); // 완료된 todo 수를 셀 요소
    const totalCountElem = document.querySelector(".totalCount"); // 전체 todo 수를 셀 요소
  
    let todoList = []; // 로컬스토리지에 저장될 todo 배열

    function setting() {
      loadStorage(); // localStorage에 저장된 todoList의 todo들 불러오기
      submitBtn.addEventListener("click", function (event) {
          event.preventDefault(); // input에 값 입력 후 추가 버튼을 눌러도 새로고침 되지 않도록.
          createList();
      });
  }

  function createList() {
      const newTodo = todoInput.value.trim(); // 문자열 앞 뒤 공백을 제거하는 trim을 이용, 사용자가 input에 입력한 todo를 저장
      if (newTodo === ""){
        alert('오늘의 할 일을 적어주세요!🍀');
        return; // 사용자가 입력하지 않았으면 함수 종료 
      }
        // 이미 같은 내용의 투두가 있는지 확인

        const isDuplicate = todoList.some((todo) => todo.text === newTodo); //some 메서드, 배열의 각 요소를 순회하면서, 주어진 조건을 만족하는 요소가 하나라도 있으면 true를 반환하고, 조건을 만족하는 요소가 없으면 false를 반환
        if (isDuplicate) {
            alert("이미 동일한 투두가 있습니다!👏🏻"); // 알림창으로 중복 투두 알림
            todoInput.value = "";
            return; // 중복되면 함수 종료
        }

      todoList.push({ text: newTodo, completed: false }); // 배열에 입력 값 저장 
      saveStorage(); // list에 새로운 todo가 추가 됨으로써 변경되었으니 다시 localStorage에 todoList 저장
      displayTodo(newTodo, false); 
      todoInput.value = ""; // 배열에 todo를 저장하고 렌더링 했다면 input을 지워서 다시 입력할 수 있도록
      updateCounts(); // 전체 todo 개수에 +1
  }

  function saveStorage() {
      localStorage.setItem("todos", JSON.stringify(todoList));  //localStorage는 문자열 형식의 데이터만 저장할 수 있기 때문에, JSON.stringify()를 사용해 자바스크립트 객체나 배열을 JSON 문자열로 변환한 후 저장. 다시 불러올 때는 JSON.parse() 이용
  }  // setItem(key,value) 특정 key에 해당 value 할당 

  function loadStorage() {
      const storedTodos = localStorage.getItem("todos"); // 기존에 localStorage에 저장되어있던 배열을 불러오기, 만약 없다면 null이 저장 됨 
      if (storedTodos) {
          todoList = JSON.parse(storedTodos);
          todoList.forEach((todo) => displayTodo(todo.text, todo.completed)); // todoList 배열을 순회하며 저장된 모든 todo를 화면에 렌더링
      }
      updateCounts(); // 새로 고침 시 기존 todoList 배열 불러와서 총 개수 맞게 렌더링
  }

  function displayTodo(todoText, isCompleted) {
      const li = document.createElement("li"); // 새로운 <li>요소 생성. 하나의 todo를 나타냄

      const checkbox = document.createElement("input"); // 새로운 input 요소 checkbox 생성
      checkbox.type = "checkbox"; // 이 요소의 type = checkbox
      checkbox.classList.add("todoCheckBox"); // 스타일링을 위해 클래스 목록에 클래스 이름 추가! 즉 checkbox에 할당되는 클래스 이름이 todo-checkbox
      checkbox.checked = isCompleted; // isCompleted가 true라면 checkbox가 체크 됨

      checkbox.addEventListener("change", function () { // checkbox의 상태가 바뀔 때, 즉 checked의 속성이 변경될 때 (사용자가 체크박스를 체크하거나 해제할 때) 실행될 이벤트 핸들러
          toggleTodoCompletion(todoText);
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
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.addEventListener("click", function () { // 버튼이 클릭 되었을 때 실행될 함수!!
        if(confirm("정말 삭제하시겠습니까?")){
            alert("todo가 삭제되었습니다.");
            deleteTodo(todoText, li);
        }else{
            alert("Kepp going!🔥");
        }
      });

      li.append(checkbox, todoSpan, deleteBtn); // appendChild를 append로 간소화!
      
      todoBox.appendChild(li); // <ul> 요소를 불러 온 todoBox에 <li>들 추가
  }

  function toggleTodoCompletion(todoText) { // 배열 todoList에서 특정 할 일 항목의 완료 상태를 토글시키는 역할
      todoList = todoList.map((todo) => { // map 메서드는 배열의 각 항목을 변형하여 새로운 배열을 반환한다!!
          if (todo.text === todoText) { // 순회하던 배열의 특정 원소의 text와 display 함수에서 props로 전달 받은 체크 상태가 변경된 todo의 text가 동일하다면?
              return { ...todo, completed: !todo.completed }; // 그 원소의 completed 상태 토글
          }
          return todo;
      });
      saveStorage(); // todoList가 업데이트 되어 새롭게 localStorage에 저장
      updateCounts(); // 체크 표시 상태에 따라 완료된 todo 개수 변경
  }

  function deleteTodo(todoText, li) {
      todoList = todoList.filter((todo) => todo.text !== todoText); // 배열을 순회하면서 props로 전달 받은 text와 동일하지 않은 text만 걸러서 즉, 전달받은 text는 존재하지 않는 배열을 새롭게 만들어 낸다
      saveStorage();
      li.classList.add('remove');  // 삭제될 요소의 스타일링을 위해 class name 부여
      li.addEventListener('animationend', () => {
            li.remove();  // 애니메이션 끝난 후 실제로 제거
        });
    updateCounts();
  }

  let isAllCompleted = JSON.parse(localStorage.getItem("isAllCompleted")) || false; // localStorage에서 값을 가져오거나 없으면 false로 초기화

  function updateCounts() {
    const totalTodos = todoList.length;
    const completedTodos = todoList.filter((todo) => todo.completed).length; // 완료된 todo 필터링

    completedCountElem.textContent = completedTodos;
    totalCountElem.textContent = totalTodos;

    // 만약 할 일이 모두 완료되었고, 그 상태가 처음으로 발생한 경우에만 alert 표시
    if (totalTodos > 0 && completedTodos === totalTodos && !isAllCompleted) {
      alert('축하합니다! 모든 할 일을 완료하셨습니다! 🎉');
      isAllCompleted = true; // 모든 할 일이 완료되었다고 기록
      localStorage.setItem("isAllCompleted", JSON.stringify(isAllCompleted)); // 상태를 localStorage에 저장
    } else if (completedTodos < totalTodos) {
      // 할 일이 삭제되거나 새로 추가되면 상태를 초기화
      isAllCompleted = false;
      localStorage.setItem("isAllCompleted", JSON.stringify(isAllCompleted)); // 상태를 localStorage에 저장
    }
  }

  setting();
});