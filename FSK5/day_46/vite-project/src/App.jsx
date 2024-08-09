import { useEffect, useState } from "react";
import "./App.css";
import RangeSlider from "./component/RangeSlider";
import ChangeTheme from "./component/ChangeTheme";
import Input from "./component/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [value, setValue] = useState(50);
  const [maxTrial, setMaxTrial] = useState(0);
  const [trial, setTrial] = useState(0);
  const [randomNum, setRandomNum] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMaxTrial(Math.ceil(Math.log2(value)));
    setTrial(Math.ceil(Math.log2(value)));
    setRandomNum(Math.floor(Math.random() * value) + 1);
  }, [value]);

  return (
    <div className={theme === "light" ? "container light" : "container dark"}>
      <ChangeTheme handleChangeTheme={handleChangeTheme} theme={theme} />
      <h2>Chào Mừng bạn đến với trờ chơi đoán số</h2>
      <h2>
        Còn <span>{trial}</span> / <span>{maxTrial}</span> lần
      </h2>
      <h2>
        Bạn cần tìm kiếm một số từ 1 đến <span>{value}</span>
      </h2>
      <RangeSlider handleChange={handleChange} value={value} theme={theme} />
      <Input
        rangeValue={value}
        randomNum={randomNum}
        setTrial={setTrial}
        trial={trial}
        maxTrial={maxTrial}
        setRandomNum={setRandomNum}
        // setGuessValue={setGuessValue}
      />
    </div>
  );
}

export default App;
