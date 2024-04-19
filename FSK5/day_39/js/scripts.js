const root = document.querySelector("#root");
const startBtn = document.querySelector(".start-btn");
// let questionNum = document.querySelector(".question-num");
let totalQuestion = document.querySelector(".total-question");
let streak = document.querySelector(".streak");
let bonus = document.querySelector(".bonus");
let score = document.querySelector(".score");
let question = document.querySelector(".question");
let countdownNum = 3;
let timer = 10;
let questionNum = 1;

const apiUrl = "http://localhost:3000/questions";

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
    <span class="bonus">+100</span>
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
  const countdownTime = setInterval(() => {
    let timer = root.querySelector(".timer-bar");
    if (width <= 0) {
      clearInterval(countdownTime);
      questionNum++;
      render();
    } else {
      console.log(width);
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
      let chosenAnswer = root.querySelector(".chosen");
      if (chosenAnswer) {
        chosenAnswer.classList.remove("chosen");
      }
      answer.classList.add("chosen");
      if (answer.dataset.id == data[questionNum - 1].answer) {
        answer.classList.add("correct-answer");
        let correctNotification = root.querySelector(".correct");
        correctNotification.classList.remove("hidden");
      } else {
        answer.classList.add("incorrect-answer");
        let correctAnswer = document.querySelector(`[data-id='${data[questionNum - 1].answer}']`);
        let incorrectNotification = root.querySelector(".incorrect");
        incorrectNotification.classList.remove("hidden");
        if (correctAnswer) {
          correctAnswer.classList.add("correct-answer");
        }
      }
      chosen = true;
      clearInterval(countdownTime);

      setTimeout(() => {
        questionNum++;
        render();
      }, 2000);
    });
  });
};
