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
        e.preventDefault();
        getNewToDo()
    });

// radio event listener for new to-do date

    for (radio of radios) {
        radio.addEventListener("click", function(e) {
            e.preventDefault;
            dateID = e.target.value; 
        });
    }

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
        saveData('todayArr', taskString);
    } else if (dateID === 'tomorrow') {
        tomorrowArr.push(taskString);
        appendListItem(taskString, tomorrowUL)
        saveData('tomorrowArr', taskString);
    } else if (dateID === 'upcoming') {
        upcomingArr.push(upcomingArr)
        appendListItem(taskString, upcomingUL)
        saveData('upcomingArr', taskString);
    } else {
        alert('missing date')
    }
    }

// create list item w/ val - append to list

    function appendListItem (txtStr, UL) {

        let newToDo = document.createElement("li");
        addEventListenerToDo(newToDo)
        newToDo.innerText = txtStr;
        newToDo.classList.add("list-group-item");
        UL.append(newToDo)
    }


// add event listener to every task to enable them to be marked as complete

    function addEventListenerToDo(item) {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            e.target.classList.add("complete");
            return item
        })
    }


// push string into array, save to local storage *************

    function saveData(key, arr) {
        localStorage.setItem(key, JSON.stringify(arr));
    }


// add event listener to delete button to delete a to-do item

    for (removeBtn of removeBtns) {
        removeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("clicked")
            var listDate = e.target.id
            console.log(listDate);
            removeTaskFromCurrent(listDate);
        });
    }


// to mark a task as complete - will be used by removerBtn

  function removeTaskFromCurrent(removeDate) {
        var selectedToRemoveArr
        var localStorageArr 

         if (removeDate === "todayDeleteBtn") {
            selectedToRemoveArr = todayUL.querySelectorAll("li.complete");
            console.log(selectedToRemoveArr);
            localStorageArr = todayArr;
         } else if (removeDate === "tomorrowDeleteBtn") {
            selectedToRemoveArr = tomorrowUL.querySelectorAll("li.complete");
            localStorageArr = tomorrowArr;
        } else if (removeDate === "upcomingDeleteBtn") {
            selectedToRemoveArr = document.querySelectorAll("li.complete");
            localStorageArr = upcomingArr;

        }

    
        for (var i = 0; i < selectedToRemoveArr.length; i++) {     
            for (var j = 0; j < localStorageArr; j++) {
                if (selectedToRemoveArr[i] === localStorageArr[j]) {
                    localStorageArr.splice(i, 1)
                    selectedToRemoveArr[i].remove();
                    continue
                }
            }
        }
        
        saveData (
          "localStorageArr",
          localStorageArr       
        );
    }    
})