const query = document.querySelector.bind(document);
const getbyid = document.getElementById.bind(document);
let count = 0;
let removebulletcalling = false;
let score = [
  { playerscore: 0, name: "" },
  { playerscore: 0, name: "" },
];
t = "Player 1";
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

randomtoss = ["heads", "tails"];

cells = [
  { body: 0 },
  { body: 0 },
  { body: 0 },
  { body: 0 },
  { body: 0 },
  { body: 0 },
  { body: 0 },
  { body: 0 },
  { body: 0 },
  { body: 0 },
];

function player1win() {
  for (let i = 0; i < 5; i++) {
    if (cells[i].body >= 4) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

function player2win() {
  for (let i = 5; i < 10; i++) {
    if (cells[i].body >= 4) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}
getbyid("heads").addEventListener("click", Toss);
getbyid("tails").addEventListener("click", Toss);
getbyid("highscorebtn").addEventListener("click", () => {
  query(".highscoretable").classList.remove("hide");
});
function Toss(Event) {
  var toss = Event.target.getAttribute("id");
  var tossresult = randomtoss[Math.floor(Math.random() * randomtoss.length)];
  query(".toss").classList.add("hide");
  if (toss == tossresult) {
    query(".p1toss").classList.remove("hide");
    t = "Player 1";
  } else {
    query(".p2toss").classList.remove("hide");
    t = "Player 2";
  }
  if (t == "Player 1") {
    p = true;
  } else {
    p = false;
  }
  gameon(p);
  getbyid("playdiv").innerHTML = t;
  setInterval(() => {
    query(".p1toss").classList.add("hide");
    query(".p2toss").classList.add("hide");
    query(".table").classList.remove("hide");
    query(".bigplay").classList.remove("hide");
  }, 2000);
}

function gameon(p) {
  getbyid("play").addEventListener("click", function () {
    checkgameover(count);

    if (removebulletcalling) {
      removingeventlistener();
    }

    if (p) {
      getbyid("playdiv").innerHTML = "Player 2";
      p = false;
      cellid = Math.floor(Math.random() * 5);
      cellno = cellid + 1;
      getbyid("cellid").innerHTML = "Player 1 got box No." + cellno;
      cells[cellid].body += 1;

      bodydrawn = cells[cellid].body;
      bodydrawing(cellid, bodydrawn, p, cellno);
    } else {
      getbyid("playdiv").innerHTML = "Player 1";

      p = true;
      cell = Math.floor(Math.random() * 5);
      cellno = cell + 1;
      getbyid("cellid").innerHTML = "Player 2 got box No." + cellno;
      cellid = cell + 5;

      cells[cellid].body += 1;
      bodydrawn = cells[cellid].body;
      bodydrawing(cellid, bodydrawn, p, cellno);
    }

    count += 1;
    console.log(count);
  });
}

function bodydrawing(cellid, bodydrawn, p, cellno) {
  if (p) {
    score[1].playerscore += 5;
  } else {
    score[0].playerscore += 5;
  }
  console.log(score);
  if (bodydrawn == 1) {
    getbyid(cellid).innerHTML = "O";
  }
  if (bodydrawn == 2) {
    getbyid(cellid).innerHTML = "O-";
  }
  if (bodydrawn == 3) {
    getbyid(cellid).innerHTML = "O|-";
  }
  if (bodydrawn == 4) {
    getbyid(cellid).innerHTML = "O|-<";
  }
  if (bodydrawn == 5) {
    getbyid(cellid).innerHTML = "🔫O|-<";
  }
  if (bodydrawn == 6) {
    getbyid(cellid).innerHTML = "•🔫O|-<";
  }
  if (bodydrawn == 7) {
    if (p) {
      getbyid("cellid").innerHTML =
        "Player 2 got box No." +
        cellno +
        " and can terminate one of the opponent's body ";
      document.querySelectorAll(".cell").forEach((item) => {
        if (item.id < 5 && item.id >= 0) {
          item.addEventListener("click", removebullet);
        }
      });
      removebulletcalling = true;
    } else {
      getbyid("cellid").innerHTML =
        "Player 1 got box No." +
        cellno +
        " and can terminate one of the opponent's body ";
      document.querySelectorAll(".cell").forEach((item) => {
        if (item.id < 10 && item.id >= 5) {
          item.addEventListener("click", removebullet);
        }
      });
      removebulletcalling = true;
    }
  }
}
function removebullet(Event) {
  removebulletcalling = false;

  cells[cellid].body -= 2;
  getbyid(cellid).innerHTML = "🔫O|-<";
  kill(Event);
  removingeventlistener();
}

function removingeventlistener() {
  document.querySelectorAll(".cell").forEach((item) => {
    item.removeEventListener("click", removebullet);
  });
}

function kill(Event) {
  var killtarget = Event.target.getAttribute("id");
  if (killtarget < 5 && killtarget >= 0) {
    score[1].playerscore += 5;
    score[0].playerscore -= 5;
  }
  if (killtarget < 10 && killtarget >= 5) {
    score[0].playerscore += 10;
    score[1].playerscore -= 5;
  }
  getbyid(killtarget).innerHTML = "";
  cells[killtarget].body = 0;
}

function checkgameover() {
  if (count > 50) {
    if (score[0].playerscore === score[1].playerscore) {
      return;
    } else {
      getbyid("play").classList.add("hide");

      if (score[0].playerscore > score[1].playerscore) {
        alert(
          "player 1 won...player 1: " +
            score[0].playerscore +
            "  player 2: " +
            score[1].playerscore
        );
      }
      if (score[1].playerscore > score[0].playerscore) {
        alert(
          "player 2 won...player 2: " +
            score[1].playerscore +
            "  player 1: " +
            score[0].playerscore
        );
      }

      // savehighscore(score);
    }
  }

  if (player1win()) {
    alert(
      "player 1 won...player 1: " +
        score[0].playerscore +
        "  player 2: " +
        score[1].playerscore
    );
    getbyid("play").classList.add("hide");

    // savehighscore(score);
  }
  if (player2win()) {
    alert(
      "player 2 won...player 2: " +
        score[1].playerscore +
        "  player 1: " +
        score[0].playerscore
    );
    getbyid("play").classList.add("hide");

    // savehighscore(score);
  }
}

function savehighscore(score) {
  score.forEach((score) => {
    const recentscore = {
      name: score.name,
      recentscore: score.playerscore,
    };
    highscores.push(recentscore);
    highscores.sort((a, b) => b.recentscore - a.recentscore);
    highscores.splice(10);
    localStorage.setItem("highscore", JSON.stringify(highscores));
  });

  console.log(highscores);
  let k = 0;
  for (let j = 11; j < 16; j++) {
    getbyid(j).innerHTML = highscores[k].recentscore;
    k += 1;
  }
}
