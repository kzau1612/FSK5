const data = [];
function register(name, password, email) {
  if (!name || !password || !email) {
    return false;
  }
  const newUser = {
    name: name,
    password: password,
    email: email,
    role: "user",
  };
  data.push(newUser);
  return newUser;
}

function login(email, password) {
  const user = data.find(function (user) {
    return user.email === email && user.password === password;
  });
  if (!user) {
    return "Thông tin đăng nhập không hợp lệ";
  }
  return user;
}

const dataRegister1 = register(
  "Nguyen Van A",
  "123456",
  "nguyenvana@email.com"
);
const dataRegister2 = register(
  "Nguyen Van B",
  "1234567",
  "nguyenvanb@email.com"
);

const dataLogin = login("nguyenvanb@email.com", "1234567");

// console.log(data);
console.log(dataLogin);
