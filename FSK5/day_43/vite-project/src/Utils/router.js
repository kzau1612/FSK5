import Navigo from "navigo";
const r = new Navigo("/", { linksSelector: "a" });
const app = document.querySelector("#app");

function navigate(path) {
  r.navigate(path);
}

export const router = (arr, layout = "") => {
  arr.forEach((e) => {
    if (e.path && typeof e.component === "function") {
      r.on(e.path, (params) => {
        app.innerHTML = e.component(params);
      });
    }
  });
  if (typeof layout === "function") {
    app.innerHTML = layout();
    arr.forEach((e) => {
      if (e.path && typeof e.component === "function") {
        r.on(e.path, (params) => {
          app.innerHTML = layout();
          const bottom = document.querySelector(".bottom");
          bottom.innerHTML = e.component(params);
        });
      }
    });
  }
  r.notFound(() => (app.innerHTML = "Sai đường dẫn"));
  r.resolve();
};
