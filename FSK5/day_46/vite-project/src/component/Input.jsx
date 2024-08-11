import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Input = ({ rangeValue, setTrial, randomNum, maxTrial, setRandomNum, trial, setData }) => {
  const [value, setValue] = useState("");
  const [showRetryBtn, setShowRetryBtn] = useState(false);
  const inputRef = useRef(null);
  const [inputData, setInputData] = useState([]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    if (newValue === "" || (+newValue >= 1 && +newValue <= +rangeValue)) {
      setValue(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (document.activeElement !== inputRef.current) {
      if (!isNaN(e.key) || e.key === "Backspace" || e.key === "Enter") {
        inputRef.current.focus();
      }
    }
  };

  const handleClick = () => {
    setValue("");
    setRandomNum(Math.floor(Math.random() * rangeValue) + 1);
    setTrial(maxTrial);
    setShowRetryBtn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(randomNum);
    if (!value) return;
    setInputData([...inputData, value]);
    if (+value < randomNum) {
      toast.warn("Bạn cần tăng giá trị lên!");
    } else if (+value > randomNum) {
      toast.warn("Bạn cần giảm giá trị xuống!");
    } else if (+value === randomNum) {
      let storedData = JSON.parse(localStorage.getItem("data")) || [];
      const data = {};
      data.guessNumbers = [...inputData, value];
      data.maxTrial = maxTrial;
      data.trueNumber = randomNum;
      storedData.unshift(data);
      localStorage.setItem("data", JSON.stringify(storedData));
      setData(storedData);
      toast.success("Chúc mừng! Bạn đã đoán đúng số!");
      setValue("");
      setTrial(0);
      setInputData([]);
      setShowRetryBtn(true);
      return;
    }

    setTrial((prev) => {
      if (prev > 0) {
        if (prev === 1) {
          let storedData = JSON.parse(localStorage.getItem("data")) || [];
          const data = {};
          data.guessNumbers = [...inputData, value];
          data.maxTrial = maxTrial;
          data.trueNumber = randomNum;
          storedData.unshift(data);
          localStorage.setItem("data", JSON.stringify(storedData));
          setData(storedData);
          setInputData([]);

          setValue("");
          setShowRetryBtn(true);
          return 0;
        }
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    if (!showRetryBtn) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showRetryBtn]);

  return (
    <>
      {showRetryBtn ? (
        <button onClick={handleClick}>Thử lại</button>
      ) : (
        <div>
          <label htmlFor="input">Hãy nhập một số</label>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              id="input"
              name="input"
              value={value}
              onChange={handleInputChange}
              ref={inputRef}
              min="1"
              max="1000"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Input;
