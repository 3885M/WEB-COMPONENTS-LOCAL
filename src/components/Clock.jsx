import React, { useEffect, useRef, useState } from "react";

const Clock = ({ theme }) => {
  const [time, setTime] = useState(new Date());
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${amPm}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const setGreeting = (hours) => {
    if (hours < 12) return "☀️ Good Morning";
    if (hours < 16) return "⛅ Good Afternoon";
    return "🌙 Good Evening";
  };

  const isLightTheme = theme === "light";

  // Dynamic Styling
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: isLightTheme ? "#eef2ff" : "#111827",
      transition: "background 0.3s ease",
    },
    clockBox: {
      textAlign: "center",
      padding: "50px",
      borderRadius: "20px",
      background: isLightTheme
        ? "linear-gradient(145deg, #ffffff, #d1d5db)"
        : "linear-gradient(145deg, #1f2937, #374151)",
      color: isLightTheme ? "#1f2937" : "#f3f4f6",
      width: "90%",
      maxWidth: "600px",
      boxShadow: isLightTheme
        ? "10px 10px 30px rgba(0, 0, 0, 0.2)"
        : "10px 10px 30px rgba(255, 255, 255, 0.1)",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    greeting: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "10px",
      opacity: 0.9,
    },
    time: {
      fontSize: "64px",
      fontWeight: "bold",
      letterSpacing: "3px",
      marginBottom: "10px",
      animation: "fadeIn 1s ease-in-out",
      transition: "color 0.5s ease",
    },
    timeColon: {
      animation: "blink 1s infinite",
    },
    date: {
      fontSize: "24px",
      opacity: 0.8,
      transition: "opacity 0.5s ease",
    },
    "@keyframes blink": {
      "50%": { opacity: 0 },
    },
    "@keyframes fadeIn": {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.clockBox}>
        <div style={styles.greeting}>{setGreeting(time.getHours())}</div>
        <div style={styles.time}>
          {time.getHours() % 12 || 12}
          <span style={styles.timeColon}>:</span>
          {time.getMinutes().toString().padStart(2, "0")}
          <span style={styles.timeColon}>:</span>
          {time.getSeconds().toString().padStart(2, "0")} {time.getHours() >= 12 ? "PM" : "AM"}
        </div>
        <div style={styles.date}>{formatDate(time)}</div>
      </div>
    </div>
  );
};

export default Clock;