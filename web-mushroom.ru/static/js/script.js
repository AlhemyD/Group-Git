const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const taskModal = document.getElementById('taskModal');
const modalTitle = document.getElementById('modalTitle');
const taskName = document.getElementById('taskName');
const taskDescription = document.getElementById('taskDescription');
const taskPriority = document.getElementById('taskPriority');
const saveButton = document.getElementById('saveButton');
let taskIdCounter = 0;

function openModal(title) {
    modalTitle.innerText = title;
    taskName.value = '';
    taskDescription.value = '';
    taskPriority.checked = false;
    taskModal.style.display = 'block';
}

function closeModal() {
    taskModal.style.display = 'none';
}

function createTaskElement(name, description, priority) {
    const taskElement = document.createElement('div');
    taskElement.id = `task-${taskIdCounter}`;
    taskElement.className = 'task';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            taskElement.classList.add('completed');
        } else {
            taskElement.classList.remove('completed');
        }
    });

    const taskText = document.createElement('span');
    taskText.innerText = name;

    const editButton = document.createElement('button');
    editButton.innerText = 'Редактировать';
    editButton.addEventListener('click', () => {
        openModal('Изменить задачу');
        taskName.value = name;
        taskDescription.value = description;
        taskPriority.checked = priority;
        deleteTask(taskElement.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить';
    deleteButton.addEventListener('click', () => {
        deleteTask(taskElement.id);
    });

    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    return taskElement;
}

function addTask(name, description, priority) {
    const taskElement = createTaskElement(name, description, priority);
    taskList.appendChild(taskElement);
    taskIdCounter++;
}

function deleteTask(taskId) {
    const taskElement = document.getElementById(taskId);
    taskList.removeChild(taskElement);
}

addButton.addEventListener('click', () => {
    openModal('Новая задача');
});

saveButton.addEventListener('click', () => {
    const taskNameValue = taskName.value;
    const taskDescriptionValue = taskDescription.value;
    const taskPriorityValue = taskPriority.checked;

    addTask(taskNameValue, taskDescriptionValue, taskPriorityValue);
    closeModal();
});

window.addEventListener('click', (event) => {
    if (event.target == taskModal) {
        closeModal();
    }
});