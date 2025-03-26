import React, { Fragment } from "react";
import ThemeToggle from "./ThemeToggle";

function Header({ activeTab, setActiveTab, theme }) {
  const isLightTheme = theme === "light";

  const navListItem = [
    { id: "home", label: "🏠 Home" },
    { id: "todos", label: "✅ To-do List" },
    { id: "clock", label: "⏰ Clock" },
    { id: "counter", label: "🔢 Counter" },
    { id: "profile", label: "👤 Profile" },
    { id: "fruits", label: "🍎 Fruits" },
  ];

  const styles = {
    header: {
      position: "sticky",
      top: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: isLightTheme ? "#ffffff" : "#1c1c1c",
      borderBottom: `2px solid ${isLightTheme ? "#ddd" : "#333"}`,
      boxShadow: isLightTheme
        ? "0px 2px 10px rgba(0, 0, 0, 0.1)"
        : "0px 2px 10px rgba(0, 255, 255, 0.2)",
      transition: "all 0.4s ease-in-out",
    },
    logo: {
      fontSize: "1.8em",
      fontWeight: "bold",
      color: isLightTheme ? "#222" : "#00ffff",
      textShadow: isLightTheme
        ? "2px 2px 5px rgba(0, 0, 0, 0.2)"
        : "0px 0px 10px rgba(0, 255, 255, 0.8)",
      letterSpacing: "1px",
    },
    nav: {
      display: "flex",
      gap: "15px",
    },
    navItem: (isActive) => ({
      cursor: "pointer",
      padding: "8px 16px",
      fontSize: "1.1em",
      fontWeight: "bold",
      color: isActive ? "#fff" : isLightTheme ? "#333" : "#bbb",
      backgroundColor: isActive
        ? isLightTheme
          ? "#007bff"
          : "#00ffff"
        : "transparent",
      borderRadius: "6px",
      boxShadow: isActive
        ? isLightTheme
          ? "0px 0px 10px rgba(0, 123, 255, 0.5)"
          : "0px 0px 15px rgba(0, 255, 255, 0.7)"
        : "none",
      transition: "all 0.3s ease-in-out",
    }),
  };

  return (
    <Fragment>
      <header style={styles.header}>
        <div style={styles.logo}>🚀 Projects Hub</div>

        <nav>
          <ul style={styles.nav}>
            {navListItem.map((item) => (
              <li
                key={item.id}
                style={styles.navItem(activeTab === item.id)}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle theme={theme} />
      </header>
    </Fragment>
  );
}

export default Header;