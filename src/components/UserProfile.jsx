import React, { useEffect, useState } from "react";

const UserProfile = ({ theme }) => {
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem("profiles");
    return savedProfiles
      ? JSON.parse(savedProfiles)
      : [
          { id: 1, name: "Alice", email: "alice@gmail.com", designation: "Developer" },
          { id: 2, name: "Bob", email: "bob@gmail.com", designation: "Manager" },
          { id: 3, name: "Charlie", email: "charlie@gmail.com", designation: "Designer" },
        ];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setFormData({ ...profile });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isConfirmed) {
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === selectedProfile.id ? formData : profile
        )
      );
      setIsEditing(false);
      setIsConfirmed(false);
    } else {
      alert("Please confirm the changes before saving.");
    }
  };

  const isLightTheme = theme === "light";

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "30px",
      background: isLightTheme ? "#f3f4f6" : "#1a1a2e",
      transition: "background 0.3s ease-in-out",
    },
    card: {
      width: "90%",
      maxWidth: "700px",
      background: isLightTheme ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.5)",
      borderRadius: "12px",
      boxShadow: isLightTheme
        ? "0px 5px 15px rgba(0, 0, 0, 0.1)"
        : "0px 5px 15px rgba(255, 255, 255, 0.1)",
      padding: "20px",
      backdropFilter: "blur(10px)",
      textAlign: "center",
      transition: "all 0.3s ease",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      padding: "15px",
      background: isLightTheme ? "#e3e7eb" : "#2a2a3c",
      color: isLightTheme ? "#222" : "#fff",
      fontWeight: "600",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      color: isLightTheme ? "#333" : "#ddd",
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
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #bbb",
      fontSize: "18px",
      marginBottom: "12px",
      transition: "border-color 0.3s ease-in-out",
    },
    label: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "8px",
      display: "block",
    },
    checkbox: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "12px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {!isEditing ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Designation</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td style={styles.td}>{profile.name}</td>
                  <td style={styles.td}>{profile.email}</td>
                  <td style={styles.td}>{profile.designation}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.button}
                      onClick={() => handleEdit(profile)}
                      onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Designation:</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              style={styles.input}
            />

            <div style={styles.checkbox}>
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
              />
              <label>Confirm Changes</label>
            </div>

            <button type="submit" style={styles.button}>
              Save Changes
            </button>
            <button
              type="button"
              style={styles.button}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
