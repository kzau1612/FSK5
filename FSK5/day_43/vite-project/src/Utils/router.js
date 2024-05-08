import Navigo from "navigo";
const r = new Navigo("/", { linksSelector: "a" });
const app = document.querySelector("#app");

export const router = (arr, layout = "") => {
  let path = "";
  let component = "";
  arr.forEach((e) => {
    if (e.path) {
      path = e.path;
    }
    if (e.component) {
      component = e.component();
    }
    r.on(path, () => {
      app.innerHTML = component;
    });
  });
  r.notFound(() => (app.innerHTML = "Sai đường dẫn"));
  r.resolve();
  if (typeof layout === "function") {
    app.innerHTML = layout();
  }
};
