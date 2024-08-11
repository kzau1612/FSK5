import { useEffect, useState, useRef } from "react";
import "./App.css";
import RangeSlider from "./component/RangeSlider";
import ChangeThemeBtn from "./component/ChangeThemeBtn";
import Input from "./component/Input";
import TableResult from "./component/TableResult";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [value, setValue] = useState(localStorage.getItem("rangeValue") || 50);
  const [maxTrial, setMaxTrial] = useState(0);
  const [trial, setTrial] = useState(0);
  const [randomNum, setRandomNum] = useState(0);
  const [data, setData] = useState([]);
  const [translateX, setTranslateX] = useState(0);
  const tableRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    localStorage.setItem("rangeValue", event.target.value);
    toast.success("Giá trị đã được thay đổi!");
  };

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMaxTrial(Math.ceil(Math.log2(value)));
    setTrial(Math.ceil(Math.log2(value)));
    setRandomNum(Math.floor(Math.random() * value) + 1);
    setData(JSON.parse(localStorage.getItem("data")) || []);
  }, [value]);

  useEffect(() => {
    const handleArrowKeyPress = (e) => {
      if (!tableRef.current) return;
      const tableWidth = tableRef.current.offsetWidth;

      if (e.key === "ArrowRight") {
        setTranslateX((prev) => Math.max(prev - tableWidth, -tableWidth * (data.length - 1)));
      } else if (e.key === "ArrowLeft") {
        setTranslateX((prev) => Math.min(prev + tableWidth, 0));
      }
    };

    window.addEventListener("keydown", handleArrowKeyPress);

    return () => {
      window.removeEventListener("keydown", handleArrowKeyPress);
    };
  }, [data]);

  return (
    <div className={theme === "light" ? "container light" : "container dark"}>
      <ChangeThemeBtn handleChangeTheme={handleChangeTheme} theme={theme} />
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
      />
      <div className="table" ref={tableRef}>
        {data &&
          data.map((item, index) => (
            <TableResult
              key={index}
              index={index}
              data={item}
              dataLength={data.length}
              trueNumber={item.trueNumber}
              maxTrial={item.maxTrial}
              style={{ transform: `translateX(${translateX}px)` }}
            />
          ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
