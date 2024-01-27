function numberToWord(number) {
  let result = "";

  if (number < 0 || number > 9999) {
    return false;
  }

  number = number.toString();
  for (let i of number) {
    switch (i) {
      case "0":
        i = "không";
        break;
      case "1":
        i = "một";
        break;
      case "2":
        i = "hai";
        break;
      case "3":
        i = "ba";
        break;
      case "4":
        i = "bốn";
        break;
      case "5":
        i = "năm";
        break;
      case "6":
        i = "sáu";
        break;
      case "7":
        i = "bảy";
        break;
      case "8":
        i = "tám";
        break;
      case "9":
        i = "chín";
        break;
    }
    result = result + i + " ";
  }
  result = result.split(" ");
  if (number.length === 4) {
    result[0] += " ngàn";
    result[1] += " trăm";
  } else if (number.length === 3) {
    result[0] += " trăm";
  }
  return result.join(" ");
}

console.log(numberToWord(4298));
