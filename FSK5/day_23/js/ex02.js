function person(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}

let user = new person("Kim", 22, "Ha noi");
console.log(user);

const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

function createCustomers(object) {
  const newCustomers = customers.slice(0);
  if (typeof object !== "object") {
    return null;
  }
  newCustomers.sort(function (a, b) {
    if (b.age > a.age) {
      return -1;
    }
  });
  for (let i in newCustomers) {
    if (newCustomers[i].hasOwnProperty("name")) {
      var value = newCustomers[i].name;
      value = value.split(" ");
      value = value.slice(0, 1) + " " + value.slice(-1);
      newCustomers[i].shortName = value;
    }
  }

  return newCustomers;
}

const result = createCustomers(customers);
console.log(result);
