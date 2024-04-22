window.onload = function () {
  document.documentElement.scrollTop = 0;
  const apiUrl = "https://api-auth-two.vercel.app";

  let page = 1;
  const postList = document.querySelector(".post-list");
  const container = document.querySelector(".container");

  const showPost = async () => {
    const response = await fetch(apiUrl + `/blogs?page=${page}`);
    const data = await response.json();
    console.log(data);
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
};
