//😍CEOS 20기 프론트엔드 파이팅😍

document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    const today = document.querySelector('.today');
    const weekDays = document.querySelector('.week-days');
    const taskList = document.querySelector('.task-list');
    const modalBtn = document.querySelector('.btn-modal');
    const taskAdd = document.querySelector('.task-add');
    const taskSave = document.querySelector('.save');
    const backBtn = document.querySelector('.back');

    let selectedDate = '';  // selected date

    // 일주일 날짜 생성, 오늘 날짜 표시
    function loadWeekDays() {
        weekDays.innerHTML = ''; 
        today.innerText = currentDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        // 날짜 계산
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // 월요일(0: 일요일, 1: 월요일)

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
                loadTasks(dateKey); 
            });

            // Today selected set
            if (dateKey === new Date().toISOString().split('T')[0]) {
                dayElement.classList.add('selected');
                selectedDate = dateKey; 
                // loadTasks(selectedDate); 
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
        taskAdd.style.display = 'flex';
    });

    // 뒤로가기
    backBtn.addEventListener('click', () => {
        modalBtn.style.display = 'block';
        taskAdd.style.display = 'none';
    });

    // Save Task
    taskSave.addEventListener('click', function () {
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
            taskAdd.style.display = 'none'; 
        }
    });


    loadWeekDays(); 
    loadTasks(selectedDate);

});