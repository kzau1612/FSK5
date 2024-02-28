function sum(...args) {
  console.log(args);
  let sum = 0;
  let length = args.length;
  if (length === 0) {
    return "Không có dữ liệu truyền vào";
  }
  for (let i = 0; i < length; i++) {
    if (typeof args[i] === "string") {
      sum += +args[i];
    } else if (
      typeof args[i] !== "number" ||
      isNaN(args[i]) ||
      args[i] === Infinity
    ) {
      return "Dữ liệu không hợp lệ";
    }
    sum += args[i];
  }
  return sum;
}

console.log(sum(1, 2, 3, 4, 5));
