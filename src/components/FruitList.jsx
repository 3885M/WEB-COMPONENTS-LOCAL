import React, { useEffect, useState } from "react";

const FruitList = ({ theme }) => {
  const [fruits, setFruits] = useState(() => {
    const savedFruits = localStorage.getItem("fruits");
    return savedFruits
      ? JSON.parse(savedFruits)
      : [
          { id: 1, name: "Apple", color: "red", quantity: 10 },
          { id: 2, name: "Grapes", color: "green", quantity: 15 },
          { id: 3, name: "BlueBerry", color: "blue", quantity: 5 },
        ];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [formData, setFormData] = useState({ name: "", color: "", quantity: 1 });
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    localStorage.setItem("fruits", JSON.stringify(fruits));
  }, [fruits]);

  const handleEdit = (fruit) => {
    setSelectedFruit(fruit);
    setFormData({ ...fruit });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setFruits(fruits.filter((fruit) => fruit.id !== id));
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (formData.name && formData.color && formData.quantity > 0) {
      if (isEditing) {
        if (isConfirmed) {
          setFruits((prevFruits) =>
            prevFruits.map((fruit) => (fruit.id === selectedFruit.id ? formData : fruit))
          );
          setIsEditing(false);
          setIsConfirmed(false);
        } else {
          alert("Please confirm the changes before saving.");
          return;
        }
      } else {
        const newId = fruits.length > 0 ? Math.max(...fruits.map((f) => f.id)) + 1 : 1;
        const newFruit = { id: newId, ...formData };
        setFruits([...fruits, newFruit]);
      }
      setFormData({ name: "", color: "", quantity: 1 });
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "quantity" ? Number(value) : value });
  };

  const isLightTheme = theme === "light";

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: isLightTheme ? "#eef2f3" : "#121212",
      color: isLightTheme ? "#333" : "#fff",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    form: {
      backgroundColor: isLightTheme ? "#fff" : "#1e1e1e",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
      width: "40%",
      textAlign: "center",
      transition: "background 0.3s ease",
    },
    input: {
      padding: "12px",
      margin: "10px 0",
      width: "80%",
      borderRadius: "8px",
      border: "1px solid #ccc",
      backgroundColor: isLightTheme ? "#fff" : "#2a2a2a",
      color: isLightTheme ? "#000" : "#ddd",
      transition: "all 0.3s ease",
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
    buttonHover: {
      transform: "scale(1.05)",
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
    },
    table: {
      width: "80%",
      borderCollapse: "collapse",
      backgroundColor: isLightTheme ? "#fff" : "#1e1e1e",
      color: isLightTheme ? "#333" : "#ddd",
      borderRadius: "10px",
      overflow: "hidden",
      textAlign: "center",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
      marginTop: "20px",
      transition: "background 0.3s ease",
    },
    th: {
      // backgroundColor: isLightTheme ? "#007bff" : "#ff416c",
      // color: "#fff",
      // padding: "14px",
      // fontSize: "18px",
      padding: "15px",
      background: isLightTheme ? "#e3e7eb" : "#2a2a3c",
      color: isLightTheme ? "#222" : "#fff",
      fontWeight: "600",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
    },
    td: {
      // padding: "14px",
      // fontSize: "16px",
      // borderBottom: "1px solid #ddd",
      padding: "12px",
      borderBottom: "1px solid #ddd",
      color: isLightTheme ? "#333" : "#ddd",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleAddOrUpdate}>
        <h2>Fruit List 🍎🍇</h2>
        <input
          type="text"
          name="name"
          placeholder="Fruit Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="color"
          placeholder="Fruit Color"
          value={formData.color}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          min={1}
          value={formData.quantity}
          onChange={handleChange}
          style={styles.input}
        />
        {isEditing && (
          <div>
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
            <label>Confirm Changes</label>
          </div>
        )}
        <button type="submit" style={styles.button}>
          {isEditing ? "Update Fruit" : "Add Fruit"}
        </button>
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Color</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fruits.map((fruit) => (
            <tr key={fruit.id}>
              <td style={styles.td}>{fruit.name}</td>
              <td style={styles.td}>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: fruit.color,
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                ></span>
                {fruit.color}
              </td>
              <td style={styles.td}>{fruit.quantity}</td>
              <td style={styles.td}>
                <button style={styles.button} onClick={() => handleEdit(fruit)}>✏️ Edit</button>
                <button style={styles.button} onClick={() => handleDelete(fruit.id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FruitList;