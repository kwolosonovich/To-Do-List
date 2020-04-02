document.addEventListener("DOMContentLoaded", function() {
  var submitTask = document.getElementById("submit-btn");
  var radios = document.getElementsByName("date");
  var todayUL = document.getElementById("today");
  var tomorrowUL = document.getElementById("tomorrow");
  var upcomingUL = document.getElementById("upcoming");
  var removeBtns = document.querySelectorAll("button.remove");

  console.log(localStorage);
  var newToDoObj = {
    dateID: undefined,
    text: undefined
  };

  //  local storage arrays
  const todayArr = JSON.parse(localStorage.getItem("todayArr")) || [];
  const tomorrowArr = JSON.parse(localStorage.getItem("tomorrowArr")) || [];
  const upcomingArr = JSON.parse(localStorage.getItem("upcomingArr")) || [];

  for (todayTodo of todayArr) {
    if (todayTodo.classList) appendListItem(todayTodo, todayUL);
  }

  for (tommorowTodo of tomorrowArr) {
    appendListItem(tommorowTodo, tomorrowUL);
  }

  for (upcomingTodo of upcomingArr) {
    appendListItem(upcomingTodo, upcomingUL);
  }

  // new to-do event listener

  submitTask.addEventListener("click", function(e) {
    e.preventDefault();
    getNewToDo();
  });

  // radio event listener for new to-do date

  for (radio of radios) {
    radio.addEventListener("click", function(e) {
      e.preventDefault;
      newToDoObj.dateID = e.target.value;
    });
  }

  // new to-do text value generated from submitTask event

  function getNewToDo() {
    newToDoObj.text = document.getElementById("inputTask").value;
    createToDo();
  }

  // create a new to-do item

  function createToDo() {
    if (newToDoObj.dateID === "today") {
      todayArr.push(newToDoObj.text);
      //   console.log("todayArr")
      //   console.log(todayArr)
      appendListItem(newToDoObj.text, todayUL);
      saveData("todayArr", JSON.stringify(todayArr));
    } else if (newToDoObj.dateID === "tomorrow") {
      tomorrowArr.push(newToDoObj.text);
      appendListItem(newToDoObj.text, tomorrowUL);
      saveData("tomorrowArr", JSON.stringify(tomorrowArr));
    } else if (newToDoObj.dateID === "upcoming") {
      upcomingArr.push(newToDoObj.text);
      appendListItem(newToDoObj.text, upcomingUL);
      saveData("upcomingArr", JSON.stringify(upcomingArr));
    } else {
      alert("missing date");
    }
  }

  // create list item w/ val - append to list

  function appendListItem(str, UL) {
    let newToDo = document.createElement("li");
    newToDo.innerText = str;
    newToDo.classList.add("list-group-item");
    UL.append(newToDo);
    addEventListenerToDo(newToDo);
  }

  // add event listener to every task to enable them to be marked as complete

  function addEventListenerToDo(newToDoLiEL) {
    newToDoLiEL.addEventListener("click", function(e) {
      e.preventDefault();
      e.target.classList.add("complete");
    });
  }

  // add event listener to delete button to delete a to-do item

  for (removeBtn of removeBtns) {
    removeBtn.addEventListener("click", function(e) {
      e.preventDefault();
      var listDate = e.target.id;
      //   console.log("test");
      removeTaskFromCurrent(listDate);
    });
  }

  // to mark a task as complete - will be used by removerBtn

  function removeTaskFromCurrent(removeDate) {
    var selectedToRemoveArr;
    var localStorageArr;
    // console.log(removeDate)

    if (removeDate === "todayDeleteBtn") {
      selectedToRemoveArr = todayUL.querySelectorAll("li.complete");
      //   console.log(selectedToRemoveArr);
      //   console.log("before")
      //   console.log(todayArr)
      selectedToRemoveArr[0].remove();
      itemIndex = todayArr.indexOf(selectedToRemoveArr[0].innerText);
      todayArr.splice(itemIndex, 1);
      localStorageArr = todayArr;
      saveData("localStorageArr", JSON.stringify(localStorageArr));

      //   console.log("after")
      //   console.log(todayArr)
    } else if (removeDate === "tomorrowDeleteBtn") {
      selectedToRemoveArr = tomorrowUL.querySelectorAll("li.complete");
      selectedToRemoveArr[0].remove();
      itemIndex = tomorrowArr.indexOf(selectedToRemoveArr[0].innerText);
      tomorrowArr.splice(itemIndex, 1);
      localStorageArr = tomorrowArr;
      saveData("localStorageArr", JSON.stringify(localStorageArr));
    } else if (removeDate === "upcomingDeleteBtn") {
      selectedToRemoveArr = upcoming.querySelectorAll("li.complete");  
      selectedToRemoveArr[0].remove();
      itemIndex = upcomingArr.indexOf(selectedToRemoveArr[0].innerText);
      upcomingArr.splice(itemIndex, 1);
      localStorageArr = upcomingArr;
      saveData("localStorageArr", JSON.stringify(localStorageArr));
    }

    // for (var i = 0; i < selectedToRemoveArr.length; i++) {
    //     selectedToRemoveArr[i].classList.add("delete");
    //     selectedToRemoveArr[i].remove();

    // }

    //     for ()
    // for (var i = 0; i < localStorageArr.length; i++) {
    //   for (var j = 0; j < selectedToRemoveArr.length; j++) {
    //     if (selectedToRemoveArr[i] === localStorageArr[j]) {

    //         selectedToRemoveArr[i].remove();
    //       continue;
    //     }
    //   }
    // }

    // saveData("localStorageArr", JSON.stringify(localStorageArr));
  }

  //  save array to local storage

  function saveData(key, arr) {
    //   console.log("called")
    localStorage.setItem(key, arr);
  }
});
