const root = document.querySelector("#root");
// let questionNum = document.querySelector(".question-num");
let totalQuestion = document.querySelector(".total-question");
let scoreEl = document.querySelector(".score");
let question = document.querySelector(".question");
let countdownNum = 3;
let timer = 10;
let questionNum = 1;
let correct = 0;
let incorrect = 0;
let streak = 0;
let score = 0;
let bonus = 0;

// const apiUrl = "http://localhost:3000/questions";
const apiUrl = "https://gwfgsg-8080.csb.app/questions";

let startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", () => {
  const countdown = setInterval(() => {
    if (countdownNum < 1) {
      clearInterval(countdown);
      render();
    } else {
      root.innerHTML = `<p class="count-down">${countdownNum}</p>`;
      +countdownNum--;
    }
  }, 1000);
});

const render = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  root.innerHTML = `
  <div class="timer"><div class="timer-bar"></div></div>
  <div class="top">
  <div class="top-left">
    <span><span class="question-num">${questionNum}</span>/<span class="total-question">${data.length}</span></span>
    <div class="streak-bar">
      <div class="streak-line-1"></div>
      <div class="streak-line-2"></div>
      <div class="streak-progress"></div>
    </div>
    <span class="bonus"></span>
  </div>
  <div class="top-right">
    <span>Score:<span class="score">0</span></span>
  </div>
</div>
<div class="question-wrapper">
  <p class="question">${data[questionNum - 1].question}</p>
</div>

<div class="answers-wrapper">
  <div class="answer" data-id="${data[questionNum - 1].options[0].id}">
    <p class="answer-text">${data[questionNum - 1].options[0].option}</p>
  </div>
  <div class="answer" data-id="${data[questionNum - 1].options[1].id}">
    <p class="answer-text">${data[questionNum - 1].options[1].option}</p>
  </div>
  <div class="answer" data-id="${data[questionNum - 1].options[2].id}">
    <p class="answer-text" >${data[questionNum - 1].options[2].option}</p>
  </div>
  <div class="answer" data-id="${data[questionNum - 1].options[3].id}">
    <p class="answer-text">${data[questionNum - 1].options[3].option}</p>
  </div>
</div>
<div class="correct hidden">
  <p>Correct !!</p>
</div>
<div class="incorrect hidden">
  <p>Incorrect !!</p>
</div>
</div>`;
  let width = 100;
  let streakProgress = root.querySelector(".streak-progress");
  streakProgress.style.width = `${(streak / 3) * 100}%`;
  let bonusEl = document.querySelector(".bonus");
  bonusEl.innerText = "+" + bonus;
  let scoreEl = document.querySelector(".score");
  scoreEl.innerText = score;

  const countdownTime = setInterval(() => {
    let timer = root.querySelector(".timer-bar");
    if (width <= 0) {
      clearInterval(countdownTime);
      questionNum++;
      render();
    } else {
      width -= 1;
      timer.style.width = width + "%";
    }
  }, 100);

  let answers = root.querySelectorAll(".answer");
  let chosen = false;
  answers.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (chosen) {
        return;
      }
      answers.forEach((otherAnswer) => {
        if (otherAnswer !== answer && otherAnswer.dataset.id != data[questionNum - 1].answer) {
          otherAnswer.classList.add("hidden");
        }
      });
      answer.classList.add("chosen");
      if (answer.dataset.id == data[questionNum - 1].answer) {
        answer.classList.add("correct-answer");
        let correctNotification = root.querySelector(".correct");
        correctNotification.classList.remove("hidden");
        correct++;
        streak++;

        score += 500 + bonus;
        scoreEl.innerText = score;
        bonus += 100;
        if (bonus >= 300) {
          bonus = 300;
        }
        streakProgress = root.querySelector(".streak-progress");
        streakProgress.style.width = `${(streak / 3) * 100}%`;
        bonusEl.innerText = "+" + bonus;
      } else {
        streak = 0;
        bonus = 0;
        streakProgress = root.querySelector(".streak-progress");
        streakProgress.style.width = `${(streak / 3) * 100}%`;

        bonusEl.innerText = "+" + bonus;
        answer.classList.add("incorrect-answer");
        let correctAnswer = document.querySelector(`[data-id='${data[questionNum - 1].answer}']`);
        let incorrectNotification = root.querySelector(".incorrect");
        incorrectNotification.classList.remove("hidden");
        if (correctAnswer) {
          correctAnswer.classList.add("correct-answer");
        }
        incorrect++;
      }
      chosen = true;
      clearInterval(countdownTime);

      setTimeout(() => {
        if (questionNum === data.length) {
          root.innerHTML = `
            <div class="result">
            <span>Result</span>
            <div><span>Accuracy:</span><span class="accuracy">${((correct / data.length) * 100).toFixed(
              1
            )}%</span></div>
            <div class="row">
              <span>
                <span class="result-score">${score}</span>
                <span>Score</span>
              </span>
              <span>
                <span class="result-streak">${streak}</span>
                <span>Streak</span>
              </span>
            </div>
            <div class="row">
              <span>
                <span class="result-correct">${correct}</span>
                <span>Correct</span>
              </span>
              <span>
                <span class="result-incorrect">${incorrect}</span>
                <span>Incorrrect</span>
              </span>
            </div>
            <button class="restart-btn">Play again</button>
          </div>
            `;
          const restartBtn = document.querySelector(".restart-btn");
          restartBtn.addEventListener("click", () => {
            root.innerHTML = `<button class="start-btn">start</button>`;
            countdownNum = 3;

            questionNum = 1;
            correct = 0;
            incorrect = 0;
            streak = 0;
            score = 0;
            bonus = 0;
            startBtn = root.querySelector(".start-btn");
            startBtn.addEventListener("click", () => {
              const countdown = setInterval(() => {
                if (countdownNum < 1) {
                  clearInterval(countdown);
                  render();
                } else {
                  root.innerHTML = `<p class="count-down">${countdownNum}</p>`;
                  +countdownNum--;
                }
              }, 1000);
            });
          });
        } else {
          questionNum++;
          render();
        }
      }, 2000);
    });
  });
};
