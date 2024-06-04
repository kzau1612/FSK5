import { useState, useRef, useEffect } from "react";

const Input = ({ rangeValue }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    if (newValue === "" || (+newValue >= 1 && +newValue <= +rangeValue)) {
      setValue(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (document.activeElement !== inputRef.current) {
      if (!isNaN(e.key)) {
        inputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <label htmlFor="input">Hãy nhập một số</label>
      <div>
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
      </div>
    </div>
  );
};

export default Input;
