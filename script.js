//😍CEOS 20기 프론트엔드 파이팅😍

// DOM Load시 실행되는 이벤트 리스너
document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    const today = document.querySelector('.today');
    const weekDays = document.querySelector('.week-days');
    const taskList = document.querySelector('.task-list');
    const modalBtn = document.querySelector('.btn-modal');
    const taskAddForm = document.querySelector('.task-form');
    const backBtn = document.querySelector('.back');
    const datePicker = document.getElementById('date-picker');

    let selectedDate = getFormattedDate(currentDate);  // selectedDate 초기값은 오늘 날짜

    // 상단 날짜 업데이트 함수
    function updateDisplayDate(date) {
        today.innerText = date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // input type=date의 초기값 설정
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    // input의 초기 값을 오늘 날짜로 설정
    datePicker.value = selectedDate;

    // 날짜 선택 이벤트 리스너
    datePicker.addEventListener('change', function(event) {
        const selectedDateObj = new Date(event.target.value); // 사용자가 선택한 날짜
        selectedDate = selectedDateObj.toISOString().split('T')[0]; // 선택된 날짜의 'YYYY-MM-DD' 형식으로 설정
        updateDisplayDate(selectedDateObj); // 상단 날짜 업데이트
        loadWeekDays(selectedDateObj); // 선택한 날짜의 주간 표시
        loadTasks(selectedDate); // 선택된 날짜의 할 일 불러오기
    });

    // 일주일 날짜 생성, 오늘 날짜 표시
    function loadWeekDays(selectedDateObj = currentDate) {
        weekDays.innerHTML = ''; 
        updateDisplayDate(selectedDateObj);      
          
        // 날짜 계산
        const firstDayOfWeek = new Date(selectedDateObj);
        firstDayOfWeek.setDate(selectedDateObj.getDate() - selectedDateObj.getDay() + 1); // 월요일(0: 일요일, 1: 월요일)

        for (let i = 0; i < 7; i++) {
            const day = new Date(firstDayOfWeek);
            day.setDate(firstDayOfWeek.getDate() + i);
            const dayElement = document.createElement('li'); 
            const dateKey = day.toISOString().split('T')[0]; 
            
            // week set
            const weekSpan = document.createElement('span');
            weekSpan.className = 'week';
            weekSpan.innerText = day.toLocaleString('en-US', { weekday: 'short' }); 
    
            // day set
            const daySpan = document.createElement('span');
            daySpan.className = 'day';
            daySpan.innerText = day.getDate(); 
    
            dayElement.dataset.dateKey = dateKey; 
            dayElement.addEventListener('click', () => {
                selectDate(dayElement); 
                selectedDate = dateKey;
                datePicker.value = dateKey;
                loadTasks(dateKey); 
            });

            // Today selected set
            if (dateKey === selectedDateObj.toISOString().split('T')[0]) {
                dayElement.classList.add('selected');
                // selectedDate = dateKey; 
                loadTasks(selectedDate); 
            }
    
            // 개별 스타일을 위한 span tag 삽입
            dayElement.appendChild(weekSpan);
            dayElement.appendChild(daySpan);
            weekDays.appendChild(dayElement);
        }
    }
    // 선택된 날짜 표시
    function selectDate(dayElement) {
        const selected = document.querySelector('.selected');
        if (selected) {
            selected.classList.remove('selected');
        }
        dayElement.classList.add('selected');
    }

    // load To Do List
    function loadTasks(dateKey) {
        taskList.innerHTML = ''; // 기존 할 일 목록 지우기
        const tasks = JSON.parse(localStorage.getItem(dateKey)) || []; // LocalStorage에서 해당 날짜의 할 일 가져오기

        tasks.forEach((task, index) => {
            addTaskToDOM(task, index);
        });
    }


    // Add To Do List -> DOM에 추가 -> 화면에 띄우기용
    function addTaskToDOM(task, index) {
        const taskElement = document.createElement('article');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <div class="task-detail">
                <span class="task-time">${task.time}</span>
                <h3 class="task-title">${task.title}</h3>
                <p class="task-desc">${task.desc}</p>
                <button class="task-delete" data-index="${index}">delete</button>
            </div>
        `;
        taskElement.querySelector('.task-delete').addEventListener('click', function () {
            const confirm = window.confirm('삭제하시겠습니까?');
            if (confirm) {
                deleteTask(selectedDate, index); // 삭제 버튼 클릭 시 할 일 삭제
            }
        });
        taskList.appendChild(taskElement);
    }

    // Add Task -> LocalStorage에 추가
    function addTaskToLocal(dateKey, task) {
        console.log(dateKey);
        const tasks = JSON.parse(localStorage.getItem(dateKey)) || [];

        // 작성시간
        task.createdTime = new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });

        tasks.push(task); 
        localStorage.setItem(dateKey, JSON.stringify(tasks)); 
    }

    // Delete Task -> LocalStorage에서 삭제 -> 기존 목록 불러오고, 목록에서 삭제 후 삭제된 목록 저장...흠
    function deleteTask(dateKey, taskIndex) {
        const tasks = JSON.parse(localStorage.getItem(dateKey)) || []; 
        tasks.splice(taskIndex, 1); 
        localStorage.setItem(dateKey, JSON.stringify(tasks)); 
        loadTasks(dateKey); 
    }

    // Modal Button
    modalBtn.addEventListener('click', () => {
        modalBtn.style.display = 'none';
        taskAddForm.style.display = 'flex';
    });

    // back navigation
    backBtn.addEventListener('click', () => {
        modalBtn.style.display = 'block';
        taskAddForm.style.display = 'none';
    });

    // Save Task -> submit 이벤트가 폼을 자동으로 제출하면서 페이지가 새로고침됨 -> 그렇기 때문에 save button이 아닌
    // form에 이벤트리스너를 등록해서 기본동작을 막아야 함. 
    taskAddForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskTitleInput = document.getElementById('task-title');
        const taskDescInput = document.getElementById('task-desc');
        const taskTitle = taskTitleInput.value; 
        const taskDesc = taskDescInput.value;

        if (selectedDate) {  // 날짜가 선택된 경우에만 저장
            const newTask = {
                title: taskTitle,
                desc: taskDesc,
                time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
            };

            // input field init
            taskTitleInput.value = '';
            taskDescInput.value = '';

            addTaskToLocal(selectedDate, newTask); 
            loadTasks(selectedDate); 
            modalBtn.style.display = 'block'; 
            taskAddForm.style.display = 'none'; 
        }
    });

    loadWeekDays(currentDate); 
    loadTasks(selectedDate);

});