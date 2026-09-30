import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    if (username === "admin" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true")
      navigate("/")
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!")
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.logo}>💊</div>

        <h1 style={styles.title}>Pharmacy AI</h1>

        <p style={styles.subtitle}>
          Hệ thống quản lý nhà thuốc
        </p>

        <form onSubmit={handleLogin}>
          <label style={styles.label}>Tên đăng nhập</label>

          <input
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Mật khẩu</label>

          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button type="submit" style={styles.button}>
            Đăng nhập
          </button>
        </form>

        <div style={styles.demo}>
          <b>Tài khoản demo</b>
          <br />
          Tên đăng nhập: admin
          <br />
          Mật khẩu: 123456
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fb",
  },

  loginBox: {
    width: "380px",
    padding: "35px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  },

  logo: {
    textAlign: "center",
    fontSize: "50px",
    marginBottom: "10px",
  },

  title: {
    textAlign: "center",
    margin: "0",
    color: "#1e293b",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "30px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "15px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "22px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  error: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    fontSize: "14px",
  },

  demo: {
    marginTop: "25px",
    padding: "12px",
    borderRadius: "7px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    fontSize: "13px",
    lineHeight: "1.6",
  },
}

export default Login