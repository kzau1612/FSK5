import { httpClient } from "./client.js";
const apiUrl = "https://api-auth-two.vercel.app";
httpClient.serverApi = apiUrl;

window.onload = function () {
  document.documentElement.scrollTop = 0;

  let page = 1;
  const postList = document.querySelector(".post-list");
  const container = document.querySelector(".container");

  const showPost = async () => {
    const response = await fetch(apiUrl + `/blogs?page=${page}`);
    const data = await response.json();
    data.data.forEach((post) => {
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
    e.preventDefault();
    formSignIn.classList.remove("hidden");
    formSignUp.classList.add("hidden");
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
        // console.log(tokens);
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
    console.log(profileRes);

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
      console.log(response);
      console.log(refreshToken);
      if (!response.res.ok) {
        throw new Error("Refresh Token Invalid");
      }
      return response.data.data.token;
    } catch {
      return false;
    }
  };

  const checkLogin = () => {
    let isLogin = false;
    if (localStorage.getItem("tokens")) {
      try {
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        if (tokens.accessToken) {
          isLogin = true;

          sendRequestProfile();
          console.log(sendRequestProfile());
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    console.log(isLogin);
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
