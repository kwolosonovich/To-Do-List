document.addEventListener("DOMContentLoaded", function() {
  var submitTask = document.getElementById("submit-btn");
  var newTask = document.getElementById("form");
  var task = newTask.value;
  var radios = document.getElementsByName("date");
  var todayUL = document.getElementById("today");
  var tomorrowUL = document.getElementById("tomorrow");
  var upcomingUL = document.getElementById("upcoming");
  var lis = document.querySelectorAll("li");
  var removeBtns = document.querySelectorAll("button.remove");
  var list = {};

  // *** mark task as complete ***

  for (li of lis) {
    li.addEventListener("click", function(e) {
      e.preventDefault;
      e.target.classList.add("complete");
    });
  }

  // *** delete task ***

  for (removeBtn of removeBtns) {
    removeBtn.addEventListener("click", function(e) {
      e.preventDefault;
      removeTask();
    });
  }

  function removeTask() {
    var selected = document.getElementsByClassName("complete");
    // console.log(selected)

    for (let i = 0; i < selected.length; i++) {
      localStorage.removeItem("todos.selected[i]");
      selected[i].remove();
    }
  }

  // *** new task date radio ***

  for (radio of radios) {
    radio.addEventListener("click", function(e) {
      e.preventDefault;
      e.target.classList.add("checked");
      var date = e.target.value;
      list.dateVal = e.target.value;
    });
  }

  // *** add new task ***

  submitTask.addEventListener("click", getTask);

  function getTask(e) {
    e.preventDefault();
    appendTodo();
  }

  // ** save new **

  function appendTodo() {
    var innerText = document.getElementById("inputTask").value;
    list.text = innerText;

    var taskLi = document.createElement("li");
    taskLi.classList.add("list-group-item");

    var textNode = document.createTextNode(list.text);
    taskLi.appendChild(textNode);

    taskLi.addEventListener("click", function(e) {
      e.preventDefault;
      e.target.classList.add("complete");
    });

    if (list.dateVal === "1") {
      todayUL.appendChild(taskLi);
      savedToDos.push({ list: list.text, date: list.dateVal });
      localStorage.setItem("todos", JSON.stringify(savedToDos));
    } else if (list.dateVal === "2") {
      tomorrowUL.appendChild(taskLi);
      savedToDos.push({ list: list.text, date: list.dateVal });
      localStorage.setItem("todos", JSON.stringify(savedToDos));
    } else if (list.dateVal === "3") {
      upcomingUL.appendChild(taskLi);
      savedToDos.push({ list: list.text, date: list.dateVal });
      localStorage.setItem("todos", JSON.stringify(savedToDos));
    } else {
      alert("Please add task and select due date");
    }
  }

  // *** get saved *todo ***

  let savedToDos = JSON.parse(localStorage.getItem("todos")) || [];
  for (let i = 0; i < savedToDos.length; i++) {
    let newToDo = document.createElement("li");
    newToDo.innerText = savedToDos[i].list;
    newToDo.date = savedToDos[i].date;

    newToDo.addEventListener("click", function(e) {
      e.preventDefault;
      e.target.classList.add("complete");
    });

    if (newToDo.date === "1") {
      newToDo.classList.add("list-group-item");
      todayUL.appendChild(newToDo);
    } else if (newToDo.date === "2") {
      newToDo.classList.add("list-group-item");
      tomorrowUL.appendChild(newToDo);
    } else if (newToDo.date === "2") {
      newToDo.classList.add("list-group-item");
      upcomingUL.appendChild(newToDo);
    }
  }
});
