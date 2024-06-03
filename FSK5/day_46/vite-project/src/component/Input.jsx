import { useState, useRef, useEffect } from "react";

const Input = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || (newValue >= 1 && newValue <= 1000)) {
      setValue(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (document.activeElement !== inputRef.current) {
      if (!isNaN(e.key)) {
        inputRef.current.focus();
        setValue((prev) => prev + e.key);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setValue((prev) => (prev === "" ? "1" : String(Math.min(parseInt(prev) + 1, 1000))));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setValue((prev) => (prev === "" ? "1" : String(Math.max(parseInt(prev) - 1, 1))));
      }
    }
  };

  const handleBackspace = (e) => {
    if (e.key === "Backspace") {
      setValue((prev) => prev.slice(0, prev.length));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    inputRef.current.addEventListener("keydown", handleBackspace);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      inputRef.current.removeEventListener("keydown", handleBackspace);
    };
  }, []);

  return (
    <div>
      <label htmlFor="input">Hãy nhập một số (1-1000)</label>
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
