document.addEventListener("DOMContentLoaded", function() {
  var submitTask = document.getElementById("submit-btn");
  var radios = document.getElementsByName("date");
  var todayUL = document.getElementById("today");
  var tomorrowUL = document.getElementById("tomorrow");
  var upcomingUL = document.getElementById("upcoming");
  var removeBtns = document.querySelectorAll("button.remove");

//  local storage arrays
    const todayArr = [];
    const tomorrowArr = [];
    const upcomingArr = [];

// new to-do event listener

    submitTask.addEventListener("click", function(e){
        e.preventDefault;
        getNewToDo()
    });

// radio event listener for new to-do date

    for (radio of radios) {
        radio.addEventListener("click", function(e) {
            e.preventDefault;
            getDate(e)
        });
    }

// get new to-do date value

    function getDate(e) {
        console.log(e)
        var date = e.target.value
        console.log(date)
        return date
    }

// new to-do text value generated from submitTask event

    function getNewToDo() {
        var toDoText = document.getElementById("inputTask").value;
        var dateID = getDate()
        createToDo(toDoText, dateID)
    }


// create a new to-do item 

    function createToDo(taskString, dateID) {
    if (dateID = 'today') {
        todayArr.push(taskString);
        appendListItem(taskString, todayUL)
        saveData('todayArr', todayArr, taskString);
    } else if (dateID = 'tomorrow') {
        tomorrowArr.push(taskString);
        appendListItem(taskString, tomorrowUL)
        saveData('tomorrowArr', tomorrowArr, taskString);
    } else if (dateID = 'upcoming') {
        upcomingArr.push(upcomingArr)
        appendListItem(taskString, upcomingUL)
        saveData('upcomingArr', upcomingArr, taskString);
    } else {
        alert('missing date')
    }
    }

// create list item w/ val - append to list

    function appendListItem (txtStr, UL) {

        let newToDo = document.createElement("li");
        addEventListenertoToDo(newTodo)
        newToDo.innerText = txtStr;
        UL.appendListItem(newToDo)
    }


// add event listener to every task to enable them to be marked as complete

    function addEventListenertoToDo(item) {
        item.addEventListener("click", function(e) {
            e.preventDefault;
            return item
        })
    }


// push string into array, save to local storage

    function saveData(key, arr) {
        localStorage.setItem(key, arr);
    }


// add event listener to delete button to delete a to-do item

    for (removeBtn of removeBtns) {
        removeBtn.addEventListener("click", function(e) {
            e.preventDefault;
            var listDate = e.target.id // code to get ID is not correct
            removeTaskFromCurrent(listDate);
        });
    }


// to mark a task as complete - will be used by removerBtn

  function removeTaskFromCurrent(removeDate) {
        var selectedToRemveArr

         if (removeDate === "todayDeleteBtn") {
            var selectedToRemveArr = document.getElementsByClassName("today.complete");
         } else if (removeDate === "tomorrowDeleteBtn") {
            selectedToRemveArr = document.getElementsByClassName("today.complete");
        } else if (removeDate === "upcomingDeleteBtn") {
            selectedToRemveArr = document.getElementsByClassName("today.complete");
        }
    
        for (var i = 0; i < selected.length; i++) {
            selected[i].remove()
            continue;
        }
    }

    // remove to-do from local storage
    function deleteFromStorage () {
        saveData(key, arr)
    }
})