import React, { useState } from "react";

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onLoginSuccess();
      } else {
        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? "Login to ConversaAI" : "Create Account"}</h2>
        {error && <p style={styles.error}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "New to ConversaAI? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} style={styles.toggleLink}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#131314", color: "#fff", fontFamily: "sans-serif" },
  card: { backgroundColor: "#1e1f20", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", width: "100%", maxWidth: "400px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" },
  input: { padding: "12px", borderRadius: "6px", border: "1px solid #3c4043", backgroundColor: "#2d2f31", color: "#fff", fontSize: "16px", outline: "none" },
  button: { padding: "12px", borderRadius: "6px", border: "none", backgroundColor: "#0b57d0", color: "#fff", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" },
  error: { color: "#ea4335", fontSize: "14px", margin: "10px 0" },
  toggleText: { marginTop: "20px", fontSize: "14px", color: "#c4c7c5" },
  toggleLink: { color: "#a8c7fa", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }
};

export default Auth;
