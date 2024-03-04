var formLogin = document.querySelector(".form-login");
var formRegister = document.querySelector(".form-register");
var loginBtn = document.querySelectorAll(".login-btn");
var registerBtn = document.querySelectorAll(".register-btn");
var loginEmail = document.querySelector("#login-email");
var loginPassword = document.querySelector("#login-password");
var fullname = document.querySelector("#fullname");
var registerEmail = document.querySelector("#register-email");
var registerPassword = document.querySelector("#register-password");
var emailError = formLogin.querySelector(".email-error");
var passwordError = formLogin.querySelector(".password-error");
var registerNameErr = formRegister.querySelector(".fullname-error");
var registerEmailErr = formRegister.querySelector(".email-error");
var registerPasswordErr = formRegister.querySelector(".password-error");
var eye = formLogin.querySelector(".eye");
var eyeClosed = formLogin.querySelector(".eye-closed");
var eye2 = formRegister.querySelector(".eye");
var eyeClosed2 = formRegister.querySelector(".eye-closed");
var login = document.querySelector(".login");
var overlay = document.querySelector(".overlay");
var container = document.querySelector(".container");
var closeForm = document.querySelector(".close-form");

//login button open form
login.addEventListener("click", function () {
  container.classList.remove("hidden");
});

//overlay close form
overlay.addEventListener("click", function () {
  container.classList.add("hidden");
});
closeForm.addEventListener("click", function () {
  container.classList.add("hidden");
});

eye.addEventListener("click", function () {
  eye.classList.toggle("hidden");
  eyeClosed.classList.toggle("hidden");
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
  }
});

eyeClosed.addEventListener("click", function () {
  eye.classList.toggle("hidden");
  eyeClosed.classList.toggle("hidden");
  if (loginPassword.type === "text") {
    loginPassword.type = "password";
  }
});

eye2.addEventListener("click", function () {
  eye2.classList.toggle("hidden");
  eyeClosed2.classList.toggle("hidden");
  if (registerPassword.type === "password") {
    registerPassword.type = "text";
  }
});

eyeClosed2.addEventListener("click", function () {
  eye2.classList.toggle("hidden");
  eyeClosed2.classList.toggle("hidden");
  if (registerPassword.type === "text") {
    registerPassword.type = "password";
  }
});

var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

loginBtn[0].style.backgroundColor = "green";
loginBtn[0].style.color = "white";

loginBtn[1].addEventListener("click", function () {
  formLogin.classList.add("active");
  formRegister.classList.remove("active");
  loginBtn[0].style.backgroundColor = "green";
  loginBtn[0].style.color = "white";
  fullname.value = "";
  registerEmail.value = "";
  registerPassword.value = "";
  registerNameErr.innerText = "";
  registerEmailErr.innerText = "";
  registerPasswordErr.innerText = "";
});

registerBtn[0].addEventListener("click", function () {
  formLogin.classList.remove("active");
  formRegister.classList.add("active");
  registerBtn[1].style.backgroundColor = "green";
  registerBtn[1].style.color = "white";
  loginEmail.value = "";
  loginPassword.value = "";
  emailError.innerText = "";
  passwordError.innerText = "";
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
  if (!loginPassword.value.trim()) {
    event.preventDefault();
    passwordError.innerText = "Vui lòng nhập thông tin";
  } else {
    passwordError.innerText = "";
  }
});

formRegister.addEventListener("submit", function (event) {
  if (!fullname.value.trim()) {
    registerNameErr.innerText = "Vui lòng nhập thông tin";
    event.preventDefault();
  } else {
    registerNameErr.innerText = "";
  }

  if (!registerEmail.value.trim()) {
    registerEmailErr.innerText = "Vui lòng nhập thông tin";
    event.preventDefault();
  } else if (!regEmail.test(registerEmail.value.trim())) {
    registerEmailErr.innerText = "Vui lòng nhập đúng định dạng email";
    event.preventDefault();
  } else {
    registerEmailErr.innerText = "";
  }

  if (!registerPassword.value.trim()) {
    event.preventDefault();
    registerPasswordErr.innerText = "Vui lòng nhập thông tin";
  } else if (
    registerPassword.value.length < 6 ||
    registerPassword.value.length > 20
  ) {
    event.preventDefault();
    registerPasswordErr.innerText = "Mật khẩu tối thiểu 6 - 20 ký tự";
  } else {
    registerPasswordErr.innerText = "";
  }
});

loginEmail.addEventListener("blur", function () {
  if (!loginEmail.value.trim()) {
    emailError.innerText = "Vui lòng nhập thông tin";
  } else if (!regEmail.test(loginEmail.value.trim())) {
    emailError.innerText = "Vui lòng nhập đúng định dạng email";
  } else {
    emailError.innerText = "";
  }
  if (!loginPassword.value.trim()) {
    passwordError.innerText = "Vui lòng nhập thông tin";
  } else {
    passwordError.innerText = "";
  }
});

loginPassword.addEventListener("blur", function () {
  if (!loginEmail.value.trim()) {
    emailError.innerText = "Vui lòng nhập thông tin";
  } else if (!regEmail.test(loginEmail.value.trim())) {
    emailError.innerText = "Vui lòng nhập đúng định dạng email";
  } else {
    emailError.innerText = "";
  }
  if (!loginPassword.value.trim()) {
    passwordError.innerText = "Vui lòng nhập thông tin";
  } else {
    passwordError.innerText = "";
  }
});

fullname.addEventListener("blur", function () {
  if (!fullname.value.trim()) {
    registerNameErr.innerText = "Vui lòng nhập thông tin";
  } else {
    registerNameErr.innerText = "";
  }

  if (!registerEmail.value.trim()) {
    registerEmailErr.innerText = "Vui lòng nhập thông tin";
  } else if (!regEmail.test(registerEmail.value.trim())) {
    registerEmailErr.innerText = "Vui lòng nhập đúng định dạng email";
  } else {
    registerEmailErr.innerText = "";
  }

  if (!registerPassword.value.trim()) {
    registerPasswordErr.innerText = "Vui lòng nhập thông tin";
  } else if (
    registerPassword.value.length < 6 ||
    registerPassword.value.length > 20
  ) {
    registerPasswordErr.innerText = "Mật khẩu tối thiểu 6 - 20 ký tự";
  } else {
    registerPasswordErr.innerText = "";
  }
});

registerEmail.addEventListener("blur", function () {
  if (!fullname.value.trim()) {
    registerNameErr.innerText = "Vui lòng nhập thông tin";
  } else {
    registerNameErr.innerText = "";
  }

  if (!registerEmail.value.trim()) {
    registerEmailErr.innerText = "Vui lòng nhập thông tin";
  } else if (!regEmail.test(registerEmail.value.trim())) {
    registerEmailErr.innerText = "Vui lòng nhập đúng định dạng email";
  } else {
    registerEmailErr.innerText = "";
  }

  if (!registerPassword.value.trim()) {
    registerPasswordErr.innerText = "Vui lòng nhập thông tin";
  } else if (
    registerPassword.value.length < 6 ||
    registerPassword.value.length > 20
  ) {
    registerPasswordErr.innerText = "Mật khẩu tối thiểu 6 - 20 ký tự";
  } else {
    registerPasswordErr.innerText = "";
  }
});

registerPassword.addEventListener("blur", function () {
  if (!fullname.value.trim()) {
    registerNameErr.innerText = "Vui lòng nhập thông tin";
  } else {
    registerNameErr.innerText = "";
  }

  if (!registerEmail.value.trim()) {
    registerEmailErr.innerText = "Vui lòng nhập thông tin";
  } else if (!regEmail.test(registerEmail.value.trim())) {
    registerEmailErr.innerText = "Vui lòng nhập đúng định dạng email";
  } else {
    registerEmailErr.innerText = "";
  }

  if (!registerPassword.value.trim()) {
    registerPasswordErr.innerText = "Vui lòng nhập thông tin";
  } else if (
    registerPassword.value.length < 6 ||
    registerPassword.value.length > 20
  ) {
    registerPasswordErr.innerText = "Mật khẩu tối thiểu 6 - 20 ký tự";
  } else {
    registerPasswordErr.innerText = "";
  }
});
