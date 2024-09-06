const form = document.querySelector(".inputBox");
const showMessage = document.querySelector(".showInput");

const init = () => {
  //form.addEventListener("submit", addTodoITem);
  showMessage.addEventListener("click", toggleForm);
};

// 입력창 초기 숨김
// form.style.display = "none";

// 입력창 열고 닫는 함수
const toggleForm = () => {
  if (form.style.display === "none") {
    form.style.display = "flex";
    showMessage.innerHTML = "입력창 다시닫기";
  } else {
    form.style.display = "none";
    showMessage.innerHTML = "입력창 불러오기";
  }
};

init();
