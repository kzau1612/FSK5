// const template = `  <h1> title </h1>
// <h2> counter</h2>`;

// const templateEl = document.createElement("template");
// templateEl.innerHTML = template;

// const templateNode = templateEl.content.cloneNode(true);
// document.body.appendChild(templateNode);

// customElements.define(
//   "header-component",
//   class extends HTMLElement {
//     constructor() {
//       super();
//     }
//     connectedCallback() {
//       this.innerText = `Hello`;
//     }
//   }
// );

// const data = {
//   count: 0,
//   title: "Counter App",
// };

// Object.keys(data).forEach((key) => {
//   window[key] = data[key];
// });

const html = `    
   <h1> {{ title }} </h1>
   <h2> {{ count }} </h2>
   `;

// const results = html.match(/{{.+?}}/g);
// results.forEach((result) => {
//   const key = result.match(/{{(.+?)}}/);
//   console.log(key[1].trim());
// });

class F8 {
  static component(name, data = {}) {
    customElements.define(
      name,
      class extends HTMLElement {
        constructor() {
          super();

          //lay object
          if (data.data) {
            this.dataObj = { ...data.data() };
          }
          Object.keys(this.dataObj).forEach((key) => {
            window[key] = this.dataObj[key];
          });
        }
        connectedCallback() {
          //   console.log(this.dataObj.count);
          //lay template
          const results = data.template.match(/{{.+?}}/g);
          results.forEach((result) => {
            const keys = result.match(/{{(.+?)}}/);
            const key = keys[1].trim();

            if (this.dataObj.hasOwnProperty(key)) {
              data.template = data.template.replace(result, this.dataObj[key]);
            }
          });

          const template = document.createElement("template");
          template.innerHTML = data.template.replace(/\/\/\s*/g, "");
          const templateNode = template.content.cloneNode(true);

          let shadow = this.attachShadow({ mode: "open" });
          let nodeChildren = templateNode.children;
          let h2 = nodeChildren[1];
          let h1 = nodeChildren[0];
          for (let i = 0; i < nodeChildren.length; i++) {
            if (nodeChildren[i].attributes.length) {
              let attribute = nodeChildren[i].attributes[0];
              let attributeName = attribute.name;
              attributeName = attributeName.split(":");
              let attributeValue = attribute.nodeValue;
              console.log(attributeValue);
              nodeChildren[i].addEventListener(attributeName[1], () => {
                eval(attributeValue);
                h2.innerText = count;
                h1.innerText = title;
              });
            }
          }

          shadow.appendChild(templateNode);
        }
      }
    );
  }
}

// F8.component("header-component", {
//   data: () => ({
//     count: 0,
//     title: "Counter App",
//   }),
//   template: `
//     //   <h1> {{ title }} </h1>
//     //   <h2> {{ count }} </h2>
//     //   <button v-on:click="count--">-</button>
//     //   <button v-on:click="count++">+</button>
//     //   `,
// });
