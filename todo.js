import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBDKqn64ZCViCW2wwC-39qSSpwNx3NRwhk",
    authDomain: "todo-app-c551b.firebaseapp.com",
    projectId: "todo-app-c551b",
    storageBucket: "todo-app-c551b.appspot.com",
    messagingSenderId: "670237277297",
    appId: "1:670237277297:web:aec41b689c238fcb8e6fd0"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const addTaskBtn = document.querySelector("#addTaskBtn")

document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();
});

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

const logoutBtn = document.querySelector("#logoutBtn")
logoutBtn.addEventListener("click", logOut)

async function logOut(e) {
    e.preventDefault;
    signOut(auth).then(() => {
       console.log( "Sign-out successful.");
       window.location.assign("/index.html")
    }).catch((error) => {
        console.log("error" , error.message);
        // An error happened.
    });
}