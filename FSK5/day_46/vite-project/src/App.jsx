import { useState } from "react";
import "./App.css";
import RangeSlider from "./component/RangeSlider";
import ChangeTheme from "./component/ChangeTheme";
import Input from "./component/Input";

function App() {
  const [theme, setTheme] = useState("light");

  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme === "light" ? "container light" : "container dark"}>
      <ChangeTheme handleChangeTheme={handleChangeTheme} theme={theme} />
      <h2>Chào Mừng bạn đến với trờ chơi đoán số</h2>
      <h2>
        Còn <span>8</span> / <span>8</span> lần
      </h2>
      <h2>
        Bạn cần tìm kiếm một số từ 1 đến <span>{value}</span>
      </h2>
      <RangeSlider handleChange={handleChange} value={value} />
      <Input rangeValue={value} />
    </div>
  );
}

export default App;
