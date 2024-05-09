import Navigo from "navigo";
const r = new Navigo("/", { linksSelector: "a" });
const app = document.querySelector("#app");

export const router = (arr, layout = "") => {
  arr.forEach((e) => {
    if (e.path && typeof e.component === "function") {
      r.on(e.path, () => {
        app.innerHTML = e.component();
      });
    }
  });
  if (typeof layout === "function") {
    app.innerHTML = layout();
  }
  r.notFound(() => (app.innerHTML = "Sai đường dẫn"));
  r.resolve();
};
