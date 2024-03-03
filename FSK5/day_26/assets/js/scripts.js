var formLogin = document.querySelector(".form-login");
var formRegister = document.querySelector(".form-register");
var loginBtn = document.querySelectorAll(".login-btn");
var registerBtn = document.querySelectorAll(".register-btn");
var loginEmail = document.querySelector("#login-email");
var loginPassword = document.querySelector("#login-password");
var emailError = formLogin.querySelector(".email-error");
var passwordError = formLogin.querySelector(".password-error");

var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

loginBtn[0].style.backgroundColor = "green";
loginBtn[0].style.color = "white";

loginBtn[1].addEventListener("click", function () {
  formLogin.classList.add("active");
  formRegister.classList.remove("active");
  loginBtn[0].style.backgroundColor = "green";
  loginBtn[0].style.color = "white";
});

registerBtn[0].addEventListener("click", function () {
  formLogin.classList.remove("active");
  formRegister.classList.add("active");
  registerBtn[1].style.backgroundColor = "green";
  registerBtn[1].style.color = "white";
  loginEmail.value = "";
  loginPassword.value = "";
});

formLogin.addEventListener("submit", function (event) {
  if (!loginEmail.value.trim()) {
    event.preventDefault();
    emailError.innerText = "Vui lòng nhập thông tin";
  } else if (!regEmail.test(loginEmail.value.trim())) {
    emailError.innerText = "Vui lòng nhập đúng định dạng email";
    event.preventDefault();
  } else {
    emailError.innerText = "";
  }
  if (!loginPassword.value) {
    event.preventDefault();
    passwordError.innerText = "Vui lòng nhập thông tin";
  } else {
    passwordError.innerText = "";
  }
});
