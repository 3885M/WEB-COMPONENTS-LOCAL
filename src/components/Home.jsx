import React from "react";

const Home = ({ theme }) => {
  const isLightTheme = theme === "light";

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: isLightTheme ? "#f3f4f6" : "#0a0a0a",
      padding: "20px",
      transition: "background 0.5s ease-in-out",
    },
    card: {
      maxWidth: "700px",
      backgroundColor: isLightTheme ? "#ffffff" : "#1c1c1c",
      padding: "40px",
      borderRadius: "16px",
      textAlign: "center",
      color: isLightTheme ? "#222" : "#e5e5e5",
      boxShadow: isLightTheme
        ? "0px 0px 20px rgba(0, 0, 0, 0.15)"
        : "0px 0px 20px rgba(0, 255, 255, 0.5)",
      transition: "all 0.4s ease-in-out",
      transform: "scale(1)",
      animation: "glowEffect 2s infinite alternate",
    },
    heading: {
      fontSize: "34px",
      fontWeight: "bold",
      marginBottom: "18px",
      textShadow: isLightTheme
        ? "2px 2px 5px rgba(0, 0, 0, 0.2)"
        : "2px 2px 10px rgba(0, 255, 255, 0.7)",
    },
    text: {
      fontSize: "20px",
      lineHeight: "1.6",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.card}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        <h1 style={styles.heading}>🚀 Welcome to My Universe 🌌</h1>
        <p style={styles.text}>
          Dive into my projects, where creativity meets technology. Using
          powerful React hooks like <b>useState</b>, <b>useRef</b>, and{" "}
          <b>useEffect</b>, I craft dynamic experiences with seamless state
          management.  
          <br />
          <br />
          Let’s explore the future together! 🔥
        </p>
      </div>
    </div>
  );
};

export default Home;