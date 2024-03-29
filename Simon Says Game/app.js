let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");
let colors = ["red", "yellow", "blue", "purple"];
let gameList = [];
let userList = [];

let level = 0;
let startGame = false;
let maxScore = 0;

document.addEventListener("keypress", function () {
  if (startGame == false) {
    startGame = true;

    levelUp();
  }
});

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  userList = [];
  level++;
  h2.innerHTML = `Level ${level} <br> Max Score : ${maxScore}`;

  let randInd = Math.floor(Math.random() * 4);
  let randColor = colors[randInd];
  let btn = document.querySelector(`.${randColor}`);
  gameList.push(randColor);
  flash(btn);
}

function checkSame(ind) {
  if (gameList[ind] === userList[ind]) {
    if (gameList.length == userList.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    maxCal();
    h2.innerHTML = `Game Over! Your score was <b>${level}</b>  <br>Press any key to restart. <br>Max Score : ${maxScore}`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

function btnsPress() {
  let btn = this;
  flash(btn);

  let userColor = btn.getAttribute("id");
  userList.push(userColor);

  checkSame(userList.length - 1);
}

for (btn of btns) {
  btn.addEventListener("click", btnsPress);
}

function maxCal() {
  if (level > maxScore) {
    maxScore = level;
  }
}

function reset() {
  level = 0;
  startGame = false;
  gameList = [];
  userList = [];
}
