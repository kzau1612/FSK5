import { httpClient } from "./client.js";
const apiUrl = "https://api-auth-two.vercel.app";
httpClient.serverApi = apiUrl;

window.onload = function () {
  document.documentElement.scrollTop = 0;

  let page = 1;
  const postList = document.querySelector(".post-list");
  const container = document.querySelector(".container");

  const showPost = async () => {
    const response = await httpClient.get(`/blogs?page=${page}`);
    response.data.data.forEach((post) => {
      const postItem = document.createElement("div");
      postItem.classList.add("post-item");
      postItem.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <p>${post.userId.name}</p>
    `;
      postList.appendChild(postItem);
    });
  };

  showPost();

  let isLoading = false;
  window.addEventListener("scroll", () => {
    const item = postList.querySelector(".post-item");

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      page++;
      showPost();
    }
  });

  const toSignInBtn = document.querySelector(".to-sign-in");
  const formSignIn = document.querySelector(".form-sign-in");
  const formSignUp = document.querySelector(".form-sign-up");

  toSignInBtn.addEventListener("click", () => {
    toSignInBtn.classList.add("hidden");
    formSignIn.classList.remove("hidden");
  });

  const signInBtn1 = document.querySelector(".form-sign-in .sign-in-btn");
  const signUpBtn1 = document.querySelector(".form-sign-in .sign-up-btn");

  const signInBtn2 = document.querySelector(".form-sign-up .sign-in-btn");
  const signUpBtn2 = document.querySelector(".form-sign-up .sign-up-btn");

  const unSignedInWrapper = document.querySelector(".not-signed-in");
  const signedInWrapper = document.querySelector(".signed-in");

  const signOutBtn = document.querySelector(".sign-out-btn");

  const dateInput = document.querySelector(".date");
  dateInput.addEventListener("blur", (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    selectedDate.setHours(currentHours);
    selectedDate.setMinutes(currentMinutes);
    selectedDate.setSeconds(currentSeconds);
    if (selectedDate < currentDate) {
      alert("Vui lòng chọn lại thời gian");
    } else {
      alert(
        `Bài viết sẽ được đăng vào ${selectedDay}/${selectedMonth}/${selectedYear} ${currentHours} giờ ${currentMinutes} phút ${currentSeconds} giây`
      );
    }
  });

  signOutBtn.addEventListener("click", () => {
    localStorage.removeItem("tokens");
    unSignedInWrapper.classList.remove("hidden");
    signedInWrapper.classList.add("hidden");
  });

  signInBtn1.addEventListener("click", (e) => {
    // e.preventDefault();
  });

  signUpBtn1.addEventListener("click", (e) => {
    e.preventDefault();
    formSignUp.classList.remove("hidden");
    formSignIn.classList.add("hidden");
    formSignIn.reset();
  });

  signInBtn2.addEventListener("click", (e) => {
    e.preventDefault();
    formSignUp.classList.add("hidden");
    formSignIn.classList.remove("hidden");
  });

  signUpBtn2.addEventListener("click", (e) => {
    // e.preventDefault();
  });

  formSignIn.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries([...new FormData(e.target)]);
    sendRequestLogin(formData);
  });

  formSignUp.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const sendRequestLogin = async function (data) {
    const response = await httpClient.post("/auth/login", data);
    if (!response.res.ok) {
      alert("Email hoặc mật khẩu không chính xác");
      return;
    }

    const tokens = {
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken,
    };

    localStorage.setItem("tokens", JSON.stringify(tokens));
    let isLogin = false;
    if (localStorage.getItem("tokens")) {
      try {
        const tokens = JSON.parse(localStorage.getItem("tokens"));

        if (tokens.accessToken) {
          isLogin = true;
          unSignedInWrapper.classList.add("hidden");
          signedInWrapper.classList.remove("hidden");
          sendRequestProfile();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const sendRequestProfile = async function () {
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    httpClient.token = tokens.accessToken;

    const profileRes = await httpClient.get("/users/profile");

    if (!profileRes.res.ok) {
      const newToken = await sendRequestRefreshToken(tokens.refreshToken);
      if (!newToken) {
        localStorage.removeItem("tokens");
        unSignedInWrapper.classList.remove("hidden");
        signedInWrapper.classList.add("hidden");
      } else {
        localStorage.setItem("tokens", JSON.stringify(newToken));
        sendRequestProfile();
      }
      return;
    }

    const profileNameEl = document.querySelector(".profile-name");
    profileNameEl.innerText = "Hello " + profileRes.data.data.name;
  };

  const sendRequestRefreshToken = async function (refreshToken) {
    try {
      const response = await httpClient.post("/auth/refresh-token", { refreshToken });
      if (!response.res.ok) {
        throw new Error("Refresh Token Invalid");
      }
      return response.data.data.token;
    } catch {
      return false;
    }
  };

  const newPostForm = document.querySelector(".new-post");
  newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries([...new FormData(e.target)]);

    addNewPost(formData);
  });

  const addNewPost = async (data) => {
    const response = await httpClient.post("/blogs", data);
    if (!response.res.ok) {
      alert("Something went wrong");
      return;
    }
    alert("Add new post successfully");
    newPostForm.reset();
    page = 1;
    postList.innerHTML = "";
    showPost();
  };

  formSignUp.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries([...new FormData(e.target)]);
    signUp(formData);
  });

  const signUp = async (data) => {
    const response = await httpClient.post("/auth/register", data);
    if (!response.res.ok) {
      alert(response.data.message);
      return;
    }
    alert("Register successfully");
    formSignIn.classList.remove("hidden");
    formSignUp.classList.add("hidden");
    formSignUp.reset();
  };

  const checkLogin = () => {
    let isLogin = false;
    if (localStorage.getItem("tokens")) {
      try {
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        if (tokens.accessToken) {
          isLogin = true;

          sendRequestProfile();
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (isLogin) {
      unSignedInWrapper.classList.add("hidden");
      signedInWrapper.classList.remove("hidden");
    } else {
      unSignedInWrapper.classList.remove("hidden");
      signedInWrapper.classList.add("hidden");
    }
  };

  checkLogin();
};
