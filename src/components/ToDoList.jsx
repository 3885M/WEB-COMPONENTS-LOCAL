import { useEffect, useState } from "react";

function ToDoList({ theme }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("General");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : { General: [] };
  });

  const categories = ["General", "Work", "Personal", "Urgent"];

  const isLightTheme = theme === "light";

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: isLightTheme ? "#f3f4f6" : "#121212",
      padding: "16px",
      transition: "background 0.3s ease",
    },
    wrapper: {
      backgroundColor: isLightTheme ? "#fff" : "#1e1e1e",
      color: isLightTheme ? "#333" : "#f9fafb",
      borderRadius: "12px",
      padding: "24px",
      width: "100%",
      maxWidth: "450px",
      boxShadow: isLightTheme
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(255, 255, 255, 0.1)",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "16px",
    },
    inputContainer: {
      display: "flex",
      gap: "8px",
      marginBottom: "16px",
    },
    input: {
      flex: 1,
      backgroundColor: isLightTheme ? "#f3f4f6" : "#333",
      color: isLightTheme ? "#333" : "#fff",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    select: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      backgroundColor: isLightTheme ? "#fff" : "#333",
      color: isLightTheme ? "#333" : "#fff",
      cursor: "pointer",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    button: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      margin: "5px",
      transition: "all 0.3s ease-in-out",
      background: "linear-gradient(135deg, #ff7eb3, #7b61ff)",
      color: "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      border: `1px solid ${isLightTheme ? "#e5e7eb" : "#444"}`,
      borderRadius: "6px",
      marginBottom: "8px",
      backgroundColor: isLightTheme ? "#f9fafb" : "#2d2d2d",
      color: isLightTheme ? "#333" : "#f9fafb",
      transition: "background 0.3s ease",
    },
    completedTask: {
      textDecoration: "line-through",
      color: isLightTheme ? "#6b7280" : "#bbb",
    },
    actionButton: {
      fontSize: "14px",
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "background 0.3s ease",
      fontWeight: "bold",
    },
    toggleButton: {
      backgroundColor: isLightTheme ? "#10b981" : "#22c55e",
      color: "#fff",
    },
    deleteButton: {
      backgroundColor: isLightTheme ? "#ef4444" : "#dc2626",
      color: "#fff",
    },
  };

  const handleTaskAction = (action, category, index) => {
    const newTasks = { ...tasks };

    if (action === "add" && task.trim() !== "") {
      if (tasks[category]?.some((t) => t.task.toLowerCase() === task.toLowerCase())) {
        alert("Task already exists in this category!");
        return;
      }

      if (!newTasks[category]) newTasks[category] = [];
      newTasks[category].push({ task, completed: false });
      setTasks(newTasks);
      setTask("");
    } else if (action === "toggle") {
      newTasks[category][index].completed = !newTasks[category][index].completed;
      setTasks(newTasks);
    } else if (action === "delete") {
      newTasks[category] = newTasks[category].filter((_, i) => i !== index);
      setTasks(newTasks);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleTaskAction("add", category);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>To-Do List</h2>

        <div style={styles.inputContainer}>
          <input
            type="text"
            style={styles.input}
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button style={styles.button} onClick={() => handleTaskAction("add", category)}>
            Add
          </button>
        </div>

        {Object.keys(tasks).map((cat) =>
          tasks[cat].length > 0 ? (
            <div key={cat}>
              <h3>{cat} Tasks</h3>
              <ul style={styles.list}>
                {tasks[cat].map((t, index) => (
                  <li key={index} style={styles.listItem}>
                    <span style={t.completed ? styles.completedTask : {}}>{t.task}</span>
                    <div>
                      <button
                        style={{ ...styles.actionButton, ...styles.toggleButton }}
                        onClick={() => handleTaskAction("toggle", cat, index)}
                      >
                        {t.completed ? "❌ Undo" : "✔ Done"}
                      </button>
                      <button
                        style={{ ...styles.actionButton, ...styles.deleteButton }}
                        onClick={() => handleTaskAction("delete", cat, index)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default ToDoList;