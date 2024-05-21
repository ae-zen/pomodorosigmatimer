document.addEventListener('DOMContentLoaded', () => {
    let timer;
    let isRunning = false;
    let minutes = 25;
    let seconds = 0;

    const startButton = document.getElementById('start-timer');
    const resetButton = document.getElementById('reset-timer');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    startButton.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            startButton.textContent = 'Pause';
            timer = setInterval(updateTimer, 1000);
        } else {
            isRunning = false;
            startButton.textContent = 'Start';
            clearInterval(timer);
        }
    });

    resetButton.addEventListener('click', () => {
        isRunning = false;
        clearInterval(timer);
        minutes = 25;
        seconds = 0;
        updateDisplay();
        startButton.textContent = 'Start';
    });

    addTodoButton.addEventListener('click', () => {
        const task = todoInput.value.trim();
        if (task !== '') {
            addTask(task);
            todoInput.value = '';
        }
    });

    function addTask(task) {
        const listItem = document.createElement('li');
        listItem.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.backgroundColor = '#f44336';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '5px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    }

    function updateTimer() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                isRunning = false;
                startButton.textContent = 'Start';
                alert('Time is up!');
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateDisplay();
    }

    function updateDisplay() {
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }
});
