// import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./components/Home";
import ToDoList from "./components/ToDoList";
import Counter from "./components/Counter";
import Clock from "./components/Clock";
import UserProfile from "./components/UserProfile";
import FruitList from "./components/FruitList";

// Theme styles
const STYLES = {
  light: {
    backgroundColor: "#ffffff",
    color: "#000",
    margin: "10px",
    padding: "10px",
    card: "#a1b2c3",
    cursor: "pointer",
  },
  dark: {
    backgroundColor: "#000",
    color: "#ffffff",
    margin: "10px",
    padding: "10px",
    card: "#3a3b3c",
    cursor: "pointer",
  },
  input: {
    margin: "10px",
    padding: "10px",
  },
  button: {
    margin: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

// Main container style
const CONTAINER_STYLE = {
  minWidth: "1000px",
  margin: "0 auto",
  padding: "20px",
  fontSize: "1.5em",
};

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    document.body.style.backgroundColor = STYLES[theme].backgroundColor;
    document.body.style.color = STYLES[theme].color;
  }, [theme]);

  // Theme toggle function
  const handleThemeToggle = () => {
    setTheme((prev) => {
      const updatedTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", updatedTheme);
      return updatedTheme;
    });
  };

  return (
    <div style={CONTAINER_STYLE}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

      <main>
        {activeTab === "home" && <Home theme={theme} />}
        {activeTab === "todos" && <ToDoList theme={theme} />}
        {activeTab === "counter" && <Counter theme={theme} />}
        {activeTab === "clock" && <Clock theme={theme} />}
        {activeTab === "profile" && <UserProfile theme={theme} />}
        {activeTab === "fruits" && <FruitList theme={theme} />}
      </main>

      <ThemeToggle theme={theme} toggleTheme={handleThemeToggle} />
    </div>
  );
}

export default App;