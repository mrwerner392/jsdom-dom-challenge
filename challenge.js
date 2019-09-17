
let counter = document.querySelector("#counter");
let likesUl = document.querySelector(".likes");
let likeCount = {};
let paused = false;
let commentInput = document.querySelector("input[type='text']");

// Timer

setInterval(incrementTime, 1000);

function incrementTime() {
  if (!paused) {
    let seconds = parseInt(counter.innerText);
    counter.innerText = `${seconds + 1}`;
  };
};

// Event Listeners

document.addEventListener("click", function(e) {
  e.preventDefault();
  if (e.target.id === "+") {
    incrementCounter();
  } else if (e.target.id === "-") {
    decrementCounter();
  } else if (e.target.id === "<3") {
    updateLikes();
  } else if (e.target.id === "pause") {
    pauseGame(e.target);
  } else if (e.target.id === "submit") {
    addComment();
  };
});

// Event Handlers

function incrementCounter() {
  let number = parseInt(counter.innerText);
  counter.innerText = `${number + 1}`;
};

function decrementCounter() {
  let number = parseInt(counter.innerText);
  counter.innerText = `${number - 1}`;
};

function updateLikes() {
  let counterNumber = counter.innerText;
  if (!likeCount[counterNumber]) {
    likeCount[counterNumber] = 1;
    createNewLi(counterNumber);
  } else {
    likeCount[counterNumber] += 1;
    updateLi(counterNumber);
  };
};

function createNewLi(counterNumber) {
  let newLi = document.createElement("li");
  newLi.id = `like-count-${counterNumber}`
  newLi.innerText = `${counterNumber} has been liked ${likeCount[counterNumber]} time`;
  likesUl.append(newLi);
};

function updateLi(counterNumber) {
  let foundLi = likesUl.querySelector(`#like-count-${counterNumber}`)
  foundLi.innerText = `${counterNumber} has been liked ${likeCount[counterNumber]} times`;
};

function pauseGame(pauseButton) {
  paused = !paused
  let allButtonsExceptPause = document.querySelectorAll("button:not(#pause)");
  allButtonsExceptPause.forEach(function(button) {button.disabled = paused});
  commentInput.disabled = paused;
  pauseButton.innerText = (paused ? "resume" : "pause");
};

function addComment() {
  let commentText = commentInput.value;
  let newComment = document.createElement("p");
  newComment.innerText = commentText;
  document.getElementById("list").append(newComment);
};
