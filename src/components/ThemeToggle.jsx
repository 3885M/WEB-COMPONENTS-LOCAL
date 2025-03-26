const ThemeToggle = ({ theme, toggleTheme }) => {
  const isLightTheme = theme === "light";

  const styles = {
    button: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2em",
      border: "none",
      background: isLightTheme
        ? "linear-gradient(145deg, #ffffff, #e0e0e0)"
        : "linear-gradient(145deg, #222, #444)",
      color: isLightTheme ? "#ffcc00" : "#0ff",
      boxShadow: isLightTheme
        ? "0 0 15px rgba(255, 204, 0, 0.5)"
        : "0 0 15px rgba(0, 255, 255, 0.5)",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      transform: "scale(1)",
    },
    buttonHover: {
      transform: "scale(1.1)",
      boxShadow: isLightTheme
        ? "0 0 25px rgba(255, 204, 0, 0.8)"
        : "0 0 25px rgba(0, 255, 255, 0.8)",
    },
    icon: {
      transition: "transform 0.3s ease-in-out",
    },
    bounce: {
      animation: "bounce 0.4s ease-in-out",
    },
  };

  return (
    <button
      style={styles.button}
      onClick={(e) => {
        toggleTheme();
        e.target.style.animation = "bounce 0.4s ease-in-out";
        setTimeout(() => (e.target.style.animation = ""), 400);
      }}
      onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      title="Toggle Theme"
    >
      <span style={styles.icon}>{isLightTheme ? "🔥" : "💀"}</span>
      {/* <span style={styles.icon}>{isLightTheme ? "🚀" : "🛸"}</span> */}
    </button>
  );
};

export default ThemeToggle;