

// Переменные для работы
let task = document.querySelector('.task');
let btnAdd = document.querySelector('.btn_add');
let btnClear = document.querySelector('.btn_clear');

document.addEventListener('DOMContentLoaded', function (evt) {
    btnClear.setAttribute('disabled', 'disabled');
    if (localStorage.getItem('tasksStr')) { showFromLocal() };
});

btnAdd.addEventListener('click', function (evt) {
    evt.preventDefault();
    addTask();
    // Очистка поля ввода инпута
    document.querySelector('.task').value = '';
});

btnClear.addEventListener('click', function () {
    removeTask();
});

// Создаем массив тасков
let taskList = [];

// функция забора задачи из инпута
function addTask() {
    let result = document.querySelector('.task_list');
    let div = document.createElement('div');
    div.classList = 'div_task';

    let newP = document.createElement('p');
    newP.classList = 'new_task';

    let input = document.createElement('input');
    input.type = 'checkbox';
    input.classList = 'check_task';

    if (task.value.trim() != '') {
        document.querySelector('.empty_task').style.display = 'none';
        result.append(div);
        div.append(newP, input);
        newP.append(task.value);
        taskList.push(task.value);
        btnClear.removeAttribute('disabled');
        addToLocal();
    }
};

// Очистка полей поставленных задач
function removeTask() {
    window.localStorage.removeItem('tasksStr');
    document.querySelectorAll('.div_task').remove();
}

// функция записывает массив данных в LocalStorage
function addToLocal() {
    let tasksStr = JSON.stringify(taskList);
    window.localStorage.setItem('tasksStr', tasksStr);
    console.log(tasksStr);
}

// функция извлекает массив данных из LocalStorage
function showFromLocal() {
    let taskArr = JSON.parse(window.localStorage.getItem('tasksStr'));
    // console.log(taskArr);
    let result = document.querySelector('.task_list');
    taskArr.forEach(el => {
        let div = document.createElement('div');
        div.classList = 'div_task';

        let newP = document.createElement('p');
        newP.classList = 'new_task';

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.classList = 'check_task';

        result.append(div);
        div.append(newP, input);
        newP.append(el);
    });
    document.querySelector('.empty_task').style.display = 'none';
    btnClear.removeAttribute('disabled');
}