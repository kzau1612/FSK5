const ChangeTheme = ({ handleChangeTheme, theme }) => {
  return (
    <div>
      <button className="change-theme-btn" onClick={handleChangeTheme}>
        {theme === "light" ? "dark" : "light"}
      </button>
    </div>
  );
};

export default ChangeTheme;
