document.addEventListener("DOMContentLoaded", function() {
  var submitTask = document.getElementById("submit-btn");
  var radios = document.getElementsByName("date");
  var todayUL = document.getElementById("today");
  var tomorrowUL = document.getElementById("tomorrow");
  var upcomingUL = document.getElementById("upcoming");
  var removeBtns = document.querySelectorAll("button.remove");
  var dateID;

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
            dateID = e.target.value;  
        });
    }

// get new to-do date value

    // function getDate(e) {
    //     console.log(e)
    //     dateID = e.target.value;
    // }

// new to-do text value generated from submitTask event

    function getNewToDo() {
        var toDoText = document.getElementById("inputTask").value;
        console.log("getNewToDo")
        createToDo(toDoText)
    }


// create a new to-do item 

    function createToDo(taskString) {
    if (dateID === 'today') {
        todayArr.push(taskString);
        appendListItem(taskString, todayUL)
        saveData('todayArr', todayArr, taskString);
    } else if (dateID === 'tomorrow') {
        tomorrowArr.push(taskString);
        appendListItem(taskString, tomorrowUL)
        saveData('tomorrowArr', tomorrowArr, taskString);
    } else if (dateID === 'upcoming') {
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
        UL.append(newToDo)
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
        var localStorageArr 

         if (removeDate === "todayDeleteBtn") {
            selectedToRemveArr = document.getElementsByClassName("today.complete");
            localStorageArr = todayArr;
         } else if (removeDate === "tomorrowDeleteBtn") {
            selectedToRemveArr = document.getElementsByClassName("tomorrow.complete");
            localStorageArr = tomorrowArr;
        } else if (removeDate === "upcomingDeleteBtn") {
            selectedToRemveArr = document.getElementsByClassName("upcoming.complete");
            localStorageArr = upcomingArr;

        }
    
        for (var i = 0; i < selectedToRemveArr.length; i++) {
          selectedToRemveArr[i].remove();
          continue;
        }
        deleteFromStorage(selectedToRemveArr, localStorageArr);
    }

    // replace old array with new array after the deleted to-do is removed from array
    function deleteFromStorage () {
        saveData(key, arr)
    }
})