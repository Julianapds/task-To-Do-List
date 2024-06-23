// Função para salvar as tarefas no localStorage
function saveTasks() {
    var dayTasks = [];
    var nightTasks = [];

    document.querySelectorAll('#dayTasksList li').forEach(task => {
        dayTasks.push({
            text: task.innerText,
            completed: task.querySelector('input[type=checkbox]').checked
        });
    });

    document.querySelectorAll('#nightTasksList li').forEach(task => {
        nightTasks.push({
            text: task.innerText,
            completed: task.querySelector('input[type=checkbox]').checked
        });
    });

    localStorage.setItem('dayTasks', JSON.stringify(dayTasks));
    localStorage.setItem('nightTasks', JSON.stringify(nightTasks));
}

// Função para carregar as tarefas do localStorage
function loadTasks() {
    var dayTasks = JSON.parse(localStorage.getItem('dayTasks')) || [];
    var nightTasks = JSON.parse(localStorage.getItem('nightTasks')) || [];

    var dayTasksList = document.getElementById('dayTasksList');
    var nightTasksList = document.getElementById('nightTasksList');

    dayTasksList.innerHTML = '';
    nightTasksList.innerHTML = '';

    dayTasks.forEach(task => {
        var newTask = createTaskElement(task.text, task.completed);
        dayTasksList.appendChild(newTask);
    });

    nightTasks.forEach(task => {
        var newTask = createTaskElement(task.text, task.completed);
        nightTasksList.appendChild(newTask);
    });
}

// Função para criar um elemento de tarefa
function createTaskElement(text, completed) {
    var newTask = document.createElement('li');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.onchange = function() {
        toggleTask(this);
    };

    var trashIcon = document.createElement('i');
    trashIcon.className = 'fas fa-trash';
    trashIcon.onclick = function() {
        deleteTask(this);
    };

    newTask.appendChild(checkbox);
    newTask.appendChild(document.createTextNode(" " + text));
    newTask.appendChild(trashIcon);

    if (completed) {
        newTask.classList.add('completed');
    }

    return newTask;
}

// Função para adicionar uma tarefa
function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskTime = document.getElementById('taskTime').value;
    var taskText = taskInput.value.trim();
    if (taskText !== '') {
        var newTask = createTaskElement(taskText, false);

        if (taskTime === 'day') {
            document.getElementById('dayTasksList').appendChild(newTask);
        } else {
            document.getElementById('nightTasksList').appendChild(newTask);
        }

        saveTasks();
        taskInput.value = '';
    }
}

// Função para alternar o estado de uma tarefa
function toggleTask(checkbox) {
    var task = checkbox.parentElement;
    if (checkbox.checked) {
        task.classList.add('completed');
    } else {
        task.classList.remove('completed');
    }
    saveTasks();
}

// Função para deletar uma tarefa
function deleteTask(icon) {
    var task = icon.parentElement;
    task.remove();
    saveTasks();
}

// Função para carregar as tarefas pendentes na página tasks.html
function loadPendingTasks() {
    var pendingTasksList = document.getElementById('pendingTasksList');
    if (pendingTasksList) {
        var dayTasks = JSON.parse(localStorage.getItem('dayTasks')) || [];
        var nightTasks = JSON.parse(localStorage.getItem('nightTasks')) || [];

        dayTasks.forEach(task => {
            if (!task.completed) {
                var newTask = createTaskElement(task.text, false);
                pendingTasksList.appendChild(newTask);
            }
        });

        nightTasks.forEach(task => {
            if (!task.completed) {
                var newTask = createTaskElement(task.text, false);
                pendingTasksList.appendChild(newTask);
            }
        });
    }
}

// Carregar as tarefas quando a página é carregada
window.onload = function() {
    if (document.getElementById('dayTasksList') && document.getElementById('nightTasksList')) {
        loadTasks();
    } else if (document.getElementById('pendingTasksList')) {
        loadPendingTasks();
    }
};
