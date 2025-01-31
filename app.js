// Tüm elementleri Seçmek
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents(){
    // Tüm eventleri çalıştırma
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoUI);
    clearButton.addEventListener("click", allTodosEverywhere);
    filterInput.addEventListener("keyup", filter);
}

// Eklenen todoları storage ile ui eşitlemesi
function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    
    if (todoListesi.length > 0) {
        todoListesi.forEach(function(todo){
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display : block");
            }else{
                todo.setAttribute("style", "display : none !important");
            }
        });
    }else{
        showAlert("warning", "Filtreleme yapmak için en az 1 todo olmalıdır");
    }
}

function allTodosEverywhere(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0){
        // Ekrandan silme
        todoListesi.forEach(function(todo){
            todo.remove();
        });
        // Storage'dan silme
        todos = [];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success", "Tüm todolar başarıyla silindi");
    }else{
        showAlert("warning", "Silmek için en az 1 todo olmalıdır");
    }
}

function removeTodoUI(e){
    if (e.target.className === "fa fa-remove") {
        // Ekrandan silmek
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        // Storage'dan silmek
        removeTodoStorage(todo.textContent);
        // Mesaj
        showAlert("success", "Todo başarıyla silindi");
    }
}

function removeTodoStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo === todo){
           todos.splice(index,1); 
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
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