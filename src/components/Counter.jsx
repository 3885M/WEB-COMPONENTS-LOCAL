import React, { useEffect, useState } from "react";

const Counter = ({ theme }) => {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [autoIncrement, setAutoIncrement] = useState(() => {
    const savedAutoIncrement = localStorage.getItem("autoIncrement");
    return savedAutoIncrement ? JSON.parse(savedAutoIncrement) : "false";
  });
  const [incrementValue, setIncrementValue] = useState(() => {
    const savedIncrementValue = localStorage.getItem("incrementValue");
    return savedIncrementValue ? parseInt(savedIncrementValue, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem("autoIncrement", autoIncrement.toString());
  }, [autoIncrement]);

  useEffect(() => {
    localStorage.setItem("incrementValue", incrementValue.toString());
  }, [incrementValue]);

  useEffect(() => {
    let interval;
    if (autoIncrement) {
      interval = setInterval(
        () => setCount((prevCount) => prevCount + incrementValue),
        1000
      );
    }
    return () => interval && clearInterval(interval);
  }, [autoIncrement, incrementValue]);

  const handleReset = () => {
    setCount(0);
    setAutoIncrement(false);
  };

  const isLightTheme = theme === "light";

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10px",
      height: "100vh",
      backgroundColor: isLightTheme ? "#f3f4f6" : "#121212",
      transition: "background 0.3s ease",
    },
    counterBox: {
      textAlign: "center",
      padding: "60px 40px",
      borderRadius: "20px",
      boxShadow: isLightTheme
        ? "0 20px 40px rgba(0, 0, 0, 0.2)"
        : "0 20px 40px rgba(255, 255, 255, 0.1)",
      backgroundColor: isLightTheme ? "#fff" : "#1e1e1e",
      color: isLightTheme ? "#333" : "#fff",
      width: "95%",
      maxWidth: "600px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    countDisplay: {
      fontSize: "64px",
      fontWeight: "bold",
      letterSpacing: "2px",
      marginBottom: "20px",
    },
    input: {
      padding: "12px",
      border: `1px solid ${isLightTheme ? "#ddd" : "#555"}`,
      borderRadius: "8px",
      outline: "none",
      backgroundColor: isLightTheme ? "#fff" : "#1e1e1e",
      color: isLightTheme ? "#000" : "#fff",
      marginBottom: "20px",
      fontSize: "18px",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    button: {
      padding: "12px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      margin: "8px 4px",
      fontSize: "18px",
      transition: "background 0.3s ease-in-out",
    },
    increment: { backgroundColor: "#22c55e", color: "white" },
    decrement: { backgroundColor: "#ef4444", color: "white" },
    reset: { backgroundColor: "#3b82f6", color: "white" },
    auto: { backgroundColor: "#f59e0b", color: "white" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.counterBox}>
        <h2 style={styles.title}>Counter</h2>
        <div style={styles.countDisplay}>{count}</div>
        <div>
          <label>Increment Amount:</label>
          <input
            type="number"
            value={incrementValue}
            onChange={(e) => setIncrementValue(Number(e.target.value))}
            min="1"
            max="100"
            style={styles.input}
          />
        </div>

        <div>
          <button
            onClick={() => setAutoIncrement(!autoIncrement)}
            style={{ ...styles.button, ...styles.auto }}
          >
            {autoIncrement ? "Stop Auto" : "Start Auto"}
          </button>
        </div>

        <div>
          <button
            onClick={() => setCount(count - incrementValue)}
            style={{ ...styles.button, ...styles.decrement }}
          >
            -
          </button>

          <button
            onClick={handleReset}
            style={{ ...styles.button, ...styles.reset }}
          >
            Reset
          </button>

          <button
            onClick={() => setCount(count + incrementValue)}
            style={{ ...styles.button, ...styles.increment }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
