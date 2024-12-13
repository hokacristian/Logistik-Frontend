import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchItems } from "../services/api";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetchItems();
        setItems(response.data);
      } catch (error) {
        alert("Gagal memuat data barang!");
      }
    };
    loadItems();
  }, []);

  return (
    <div className="container">
      <h1>Dashboard Pengiriman</h1>
      <button
        className="custom-button"
        onClick={() => navigate("/create-item")}
      >
        Tambah Item Baru
      </button>

      {/* Tambahkan wrapper table-container */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Berat (Kg)</th>
              <th>Kota Asal</th>
              <th>Kota Tujuan</th>
              <th>Sender ID</th>
              <th>Receiver ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.weight}</td>
                <td>{item.senderCity}</td>
                <td>{item.receiverCity}</td>
                <td>{item.senderId}</td>
                <td>{item.receiverId}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
