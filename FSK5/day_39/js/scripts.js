const root = document.querySelector("#root");
const startBtn = document.querySelector(".start-btn");
let questionNum = document.querySelector(".question-num");
let totalQuestion = document.querySelector(".total-question");
let streak = document.querySelector(".streak");
let bonus = document.querySelector(".bonus");
let score = document.querySelector(".score");
let question = document.querySelector(".question");
const answerWrapper = document.querySelector(".answers-wrapper");
let answers = document.querySelectorAll(".answer");

startBtn.addEventListener("click", () => {
  root.innerHTML = `      <div class="top">
  <div class="top-left">
    <span><span class="question-num">1</span>/<span class="total-question">8</span></span>
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
  <p class="question">okosakdoasodasodasodka</p>
</div>

<div class="answers-wrapper">
  <div class="answer">
    <p class="answer-text">Answer 1</p>
  </div>
  <div class="answer">
    <p class="answer-text">Answer 2</p>
  </div>
  <div class="answer">
    <p class="answer-text">Answer 3</p>
  </div>
  <div class="answer">
    <p class="answer-text">Answer 4</p>
  </div>
</div>
<div class="correct hidden">
  <p>Correct!!</p>
</div>
<div class="incorrect hidden">
  <p>Incorrect!!</p>
</div>
</div>`;
});

answers.forEach((answer) => {
  answer.addEventListener("click", () => {
    let chosenAnswer = answerWrapper.querySelector(".chosen");
    if (chosenAnswer) {
      chosenAnswer.classList.remove("chosen");
    }
    answer.classList.add("chosen");
  });
});
