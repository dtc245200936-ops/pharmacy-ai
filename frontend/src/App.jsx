import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"
import Medicines from "./pages/Medicines"
import Login from "./pages/Login"

function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>
      <p>Chào mừng bạn đến với hệ thống quản lý nhà thuốc AI.</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h3>💊 Tổng số thuốc</h3>
          <h2>120</h2>
        </div>

        <div style={cardStyle}>
          <h3>📦 Sắp hết hàng</h3>
          <h2>8</h2>
        </div>

        <div style={cardStyle}>
          <h3>🧾 Hóa đơn hôm nay</h3>
          <h2>25</h2>
        </div>

        <div style={cardStyle}>
          <h3>💰 Doanh thu</h3>
          <h2>5.200.000 đ</h2>
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  width: "200px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Trang đăng nhập */}
        <Route path="/login" element={<Login />} />

        {/* Hệ thống chính */}
        <Route
          path="/*"
          element={
            <div
              style={{
                display: "flex",
                minHeight: "100vh",
                fontFamily: "Arial",
                backgroundColor: "#f5f7fb",
              }}
            >
              <aside
                style={{
                  width: "240px",
                  backgroundColor: "#1e293b",
                  color: "white",
                  padding: "25px 15px",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "35px",
                  }}
                >
                  💊 Pharmacy AI
                </h2>

                <Link to="/" style={linkStyle}>
                  🏠 Dashboard
                </Link>

                <Link to="/medicines" style={linkStyle}>
                  💊 Quản lý thuốc
                </Link>

                <div style={linkStyle}>📦 Nhập kho</div>
                <div style={linkStyle}>🧾 Bán hàng</div>
                <div style={linkStyle}>👥 Người dùng</div>
                <div style={linkStyle}>📊 Thống kê</div>
                <div style={linkStyle}>🤖 Trợ lý AI</div>
              </aside>

              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/medicines" element={<Medicines />} />
                </Routes>
              </main>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

const linkStyle = {
  display: "block",
  padding: "12px",
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
}

export default App