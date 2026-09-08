import { useState } from "react"

function Medicines() {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      code: "MED001",
      name: "Paracetamol 500mg",
      category: "Thuốc giảm đau",
      unit: "Hộp",
      price: "25.000 đ",
      stock: 50,
    },
    {
      id: 2,
      code: "MED002",
      name: "Vitamin C 500mg",
      category: "Vitamin",
      unit: "Hộp",
      price: "40.000 đ",
      stock: 30,
    },
    {
      id: 3,
      code: "MED003",
      name: "Thuốc tiêu hóa Demo",
      category: "Tiêu hóa",
      unit: "Hộp",
      price: "35.000 đ",
      stock: 8,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    code: "",
    name: "",
    category: "",
    unit: "",
    price: "",
    stock: "",
  })

  // =========================
  // THAY ĐỔI DỮ LIỆU FORM
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setForm({
      code: "",
      name: "",
      category: "",
      unit: "",
      price: "",
      stock: "",
    })

    setEditingId(null)
    setShowForm(false)
  }

  // =========================
  // THÊM THUỐC
  // =========================
  const handleAdd = () => {
    if (!form.code || !form.name || !form.category) {
      alert("Vui lòng nhập mã thuốc, tên thuốc và danh mục!")
      return
    }

    const newMedicine = {
      id: Date.now(),
      ...form,
    }

    setMedicines([...medicines, newMedicine])

    alert("Thêm thuốc thành công!")

    resetForm()
  }

  // =========================
  // SỬA THUỐC
  // =========================
  const handleUpdate = () => {
    if (!form.code || !form.name || !form.category) {
      alert("Vui lòng nhập mã thuốc, tên thuốc và danh mục!")
      return
    }

    setMedicines(
      medicines.map((medicine) =>
        medicine.id === editingId
          ? {
              ...medicine,
              ...form,
            }
          : medicine
      )
    )

    alert("Cập nhật thuốc thành công!")

    resetForm()
  }

  // =========================
  // MỞ FORM SỬA
  // =========================
  const handleEdit = (medicine) => {
    setForm({
      code: medicine.code,
      name: medicine.name,
      category: medicine.category,
      unit: medicine.unit,
      price: medicine.price,
      stock: medicine.stock,
    })

    setEditingId(medicine.id)
    setShowForm(true)
  }

  // =========================
  // XÓA THUỐC
  // =========================
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa thuốc này không?"
    )

    if (confirmDelete) {
      setMedicines(
        medicines.filter(
          (medicine) => medicine.id !== id
        )
      )

      alert("Xóa thuốc thành công!")
    }
  }

  // =========================
  // TÌM KIẾM THUỐC
  // =========================
  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      medicine.code
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  return (
    <div style={pageStyle}>
      <h1>💊 Quản lý thuốc</h1>

      {/* THANH CÔNG CỤ */}
      <div style={toolbarStyle}>
        <input
          type="text"
          placeholder="🔍 Tìm theo mã hoặc tên thuốc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchStyle}
        />

        {/* NÚT THÊM THUỐC */}
        <button
          onClick={() => {
            setEditingId(null)

            setForm({
              code: "",
              name: "",
              category: "",
              unit: "",
              price: "",
              stock: "",
            })

            setShowForm(true)
          }}
          style={addButtonStyle}
        >
          + Thêm thuốc
        </button>
      </div>

      {/* FORM THÊM / SỬA */}
      {showForm && (
        <div style={formContainerStyle}>
          <h2>
            {editingId !== null
              ? "✏️ Sửa thông tin thuốc"
              : "➕ Thêm thuốc mới"}
          </h2>

          <div>
            <input
              name="code"
              placeholder="Mã thuốc"
              value={form.code}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="name"
              placeholder="Tên thuốc"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="category"
              placeholder="Danh mục"
              value={form.category}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="unit"
              placeholder="Đơn vị"
              value={form.unit}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="price"
              placeholder="Giá bán"
              value={form.price}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="stock"
              type="number"
              placeholder="Số lượng tồn kho"
              value={form.stock}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            {/* NÚT LƯU / CẬP NHẬT */}
            <button
              onClick={
                editingId !== null
                  ? handleUpdate
                  : handleAdd
              }
              style={saveButtonStyle}
            >
              {editingId !== null
                ? "💾 Cập nhật"
                : "💾 Lưu thuốc"}
            </button>

            {/* NÚT HỦY */}
            <button
              onClick={resetForm}
              style={cancelButtonStyle}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* BẢNG DANH SÁCH THUỐC */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Mã thuốc</th>
              <th style={thStyle}>Tên thuốc</th>
              <th style={thStyle}>Danh mục</th>
              <th style={thStyle}>Đơn vị</th>
              <th style={thStyle}>Giá bán</th>
              <th style={thStyle}>Tồn kho</th>
              <th style={thStyle}>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id}>
                <td style={tdStyle}>
                  {medicine.code}
                </td>

                <td style={tdStyle}>
                  {medicine.name}
                </td>

                <td style={tdStyle}>
                  {medicine.category}
                </td>

                <td style={tdStyle}>
                  {medicine.unit}
                </td>

                <td style={tdStyle}>
                  {medicine.price}
                </td>

                <td style={tdStyle}>
                  {medicine.stock}
                </td>

                <td style={tdStyle}>
                  {/* SỬA */}
                  <button
                    onClick={() =>
                      handleEdit(medicine)
                    }
                    style={editButtonStyle}
                  >
                    ✏️ Sửa
                  </button>

                  {/* XÓA */}
                  <button
                    onClick={() =>
                      handleDelete(medicine.id)
                    }
                    style={deleteButtonStyle}
                  >
                    🗑 Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* KHÔNG CÓ KẾT QUẢ */}
        {filteredMedicines.length === 0 && (
          <p style={{ padding: "20px" }}>
            Không tìm thấy thuốc.
          </p>
        )}
      </div>
    </div>
  )
}

// =========================
// CSS
// =========================

const pageStyle = {
  padding: "30px",
}

const toolbarStyle = {
  display: "flex",
  gap: "15px",
  margin: "25px 0",
}

const searchStyle = {
  width: "350px",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "15px",
}

const inputStyle = {
  width: "180px",
  padding: "10px",
  margin: "5px",
  border: "1px solid #ccc",
  borderRadius: "5px",
}

const addButtonStyle = {
  padding: "12px 20px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
}

const saveButtonStyle = {
  padding: "10px 18px",
  backgroundColor: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
}

const cancelButtonStyle = {
  padding: "10px 18px",
  backgroundColor: "#64748b",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
}

const editButtonStyle = {
  padding: "7px 12px",
  backgroundColor: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "8px",
}

const deleteButtonStyle = {
  padding: "7px 12px",
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
}

const formContainerStyle = {
  backgroundColor: "white",
  padding: "20px",
  marginBottom: "25px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
}

const tableContainerStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
}

const thStyle = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
}

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #eee",
}

export default Medicines