const dateInput = document.querySelector(".date");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  const dateValue = dateInput.value; // Lấy giá trị ngày tháng được chọn
  const selectedDate = new Date(dateValue); // Chuyển đổi thành đối tượng Date

  const currentDate = new Date(); // Lấy thời điểm hiện tại

  // Lấy thông tin về giờ, phút và giây của thời điểm hiện tại
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  // Thêm thông tin về giờ, phút và giây vào ngày tháng được chọn
  selectedDate.setHours(currentHours);
  selectedDate.setMinutes(currentMinutes);
  selectedDate.setSeconds(currentSeconds);

  console.log(selectedDate.toLocaleString());

  //   const currentDateMs = currentDate.getTime(); // Chuyển đổi thời điểm hiện tại thành mili giây
  //   const selectedDateMs = selectedDate.getTime(); // Chuyển đổi ngày tháng được chọn thành mili giây

  //   let difference = selectedDateMs - currentDateMs;

  //   let seconds = Math.floor(difference / 1000);
  //   let minutes = Math.floor(seconds / 60);
  //   let hours = Math.floor(minutes / 60);
  //   let days = Math.floor(hours / 24);

  //   hours %= 24;
  //   minutes %= 60;
  //   seconds %= 60;

  //   console.log(hours, minutes, seconds);
});
