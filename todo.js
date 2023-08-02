

addTaskBtn.addEventListener("click", addTask)
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        var taskItem = document.createElement("li");
        taskItem.classList.add("task-list-item", "list-group-item");
        taskItem.appendChild(document.createTextNode(taskInput.value));

        var buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("task-buttons");

        var deleteButton = document.createElement("button");
        deleteButton.appendChild(document.createTextNode("Delete"));
        deleteButton.classList.add("btn", "btn-danger", "delete");
        deleteButton.setAttribute("onclick", "deleteTask(this)");
        buttonsDiv.appendChild(deleteButton);

        var editButton = document.createElement("button");
        editButton.appendChild(document.createTextNode("Edit"));
        editButton.classList.add("btn", "btn-info", "edit");
        editButton.setAttribute("onclick", "editTask(this)");
        buttonsDiv.appendChild(editButton);

        taskItem.appendChild(buttonsDiv);
        taskList.appendChild(taskItem);
        taskInput.value = "";

        saveTasksToLocalStorage();
    }
}

function deleteTask(task) {
    var listItem = task.parentNode.parentNode;
    var taskList = listItem.parentNode;
    taskList.removeChild(listItem);

    saveTasksToLocalStorage();
}

function editTask(task) {
    var listItem = task.parentNode.parentNode;
    var taskText = listItem.firstChild;
    var newText = prompt("Edit the task:", taskText.nodeValue);

    if (newText !== null && newText !== "") {
        taskText.nodeValue = newText;
        saveTasksToLocalStorage();
    }
}

function saveTasksToLocalStorage() {
    var taskList = document.getElementById("taskList");
    var tasks = [];

    for (var i = 0; i < taskList.children.length; i++) {
        var taskText = taskList.children[i].firstChild.nodeValue;
        tasks.push(taskText);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    var taskList = document.getElementById("taskList");
    var tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks !== null) {
        for (var i = 0; i < tasks.length; i++) {
            var taskItem = document.createElement("li");
            taskItem.classList.add("task-list-item", "list-group-item");
            taskItem.appendChild(document.createTextNode(tasks[i]));

            var buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("task-buttons");

            var deleteButton = document.createElement("button");
            deleteButton.appendChild(document.createTextNode("Delete"));
            deleteButton.classList.add("btn", "btn-danger", "delete");
            deleteButton.setAttribute("onclick", "deleteTask(this)");
            buttonsDiv.appendChild(deleteButton);

            var editButton = document.createElement("button");
            editButton.appendChild(document.createTextNode("Edit"));
            editButton.classList.add("btn", "btn-info", "edit");
            editButton.setAttribute("onclick", "editTask(this)");
            buttonsDiv.appendChild(editButton);

            taskItem.appendChild(buttonsDiv);
            taskList.appendChild(taskItem);
        }
    }
}
