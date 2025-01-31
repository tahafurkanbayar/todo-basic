// Tüm elementleri Seçmek
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");

let todos = [];

runEvents();

function runEvents(){
    // Tüm eventleri çalıştırma
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
}

// Eklenen todoları storage ile ui eşitlemesi
function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText === "" || inputText === null){
        showAlert("warning", "Lütfen boş alan bırakmayınız.");
    }else{
        // Arayüze ekleme
        addTodoToUI(inputText);
        // Storage ekleme
        addTodoToStorage(inputText);
        // Hata mesajı çağırma
        showAlert("success", "Todo başarıyla eklendi.");
    }

    console.log("Submit Eventi Çalıştı");
    e.preventDefault();
}

function addTodoToUI(newTodo){
 
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";

}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}    

function checkTodosFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }   
}

function showAlert(type, message){
    // Hata Mesajı Fonksiyonu 
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    firstCardBody.appendChild(div);
    // Hata mesajını belirli bir süre sonra silme
    setTimeout(function(){
        div.remove();
    }, 2500);
}