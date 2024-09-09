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
    const ulElement = document.querySelector('.week-days');


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

    let selectedDate = getFormattedDate(currentDate);  // selectedDate 초기값은 오늘 날짜

    // 상단 날짜 업데이트 함수

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

        // 날짜 계산 주간 첫번째 날 웡요일 설정로직
        const firstDayOfWeek = new Date(selectedDateObj);
        const dayOfWeek = selectedDateObj.getDay();

        // 일요일인 경우 특별 처리
        if (dayOfWeek === 0) {
            firstDayOfWeek.setDate(selectedDateObj.getDate() - 6); // 일요일일 경우 전주의 월요일을 설정
        } else {
            firstDayOfWeek.setDate(selectedDateObj.getDate() - dayOfWeek + 1); // 월요일 설정
        }

        
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
    
            // dateKey 설정
            dayElement.dataset.dateKey = dateKey; 

            // Today selected set
            if (dateKey === selectedDateObj.toISOString().split('T')[0]) {
                dayElement.classList.add('selected');
                loadTasks(selectedDate); 
            }
    
            // 개별 스타일을 위한 span tag 삽입
            dayElement.appendChild(weekSpan);
            dayElement.appendChild(daySpan);
            weekDays.appendChild(dayElement);
        }
        // UL 요소에 이벤트 리스너 등록 (이벤트 위임)
        ulElement.addEventListener('click', (event) => {
            const dayElement = event.target.closest('li'); // 클릭된 요소 중 가장 가까운 li 요소 찾기
            if (dayElement) { // li 요소가 클릭된 경우만 실행
                const dateKey = dayElement.dataset.dateKey; // li의 데이터 속성에서 dateKey 가져오기
                selectDate(dayElement); // 날짜 선택 처리
                selectedDate = dateKey; // 선택된 날짜 설정
                datePicker.value = dateKey; // 날짜 선택기를 선택한 날짜로 설정
                loadTasks(dateKey); // 선택한 날짜의 할 일 로드
            }
        });
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
        taskElement.className = 'task-item';
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
        modalBtn.style.display = 'inline-block';
        taskAddForm.style.display = 'none';
    });

    // Save Task -> submit 이벤트가 폼을 자동으로 제출하면서 페이지가 새로고침됨 -> 그렇기 때문에 save button이 아닌
    // form에 이벤트리스너를 등록해서 기본동작을 막아야 함. 
    taskAddForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskTitle = document.getElementById('task-title').value.trim();
        const taskDesc = document.getElementById('task-desc').value.trim();

        const newTask = {
            title: taskTitle,
            desc: taskDesc,
            time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
        };

        // input field init 모든 폼 요소를 초기화할 때 사용가능
        taskAddForm.reset();


        addTaskToLocal(selectedDate, newTask); 
        loadTasks(selectedDate); 
        modalBtn.style.display = 'block'; 
        taskAddForm.style.display = 'none';
    });

    loadWeekDays(currentDate); 
    loadTasks(selectedDate);

});