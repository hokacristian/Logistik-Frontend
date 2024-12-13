import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../services/api";

const cities = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Semarang",
  "Yogyakarta",
  "Malang",
  "Medan",
  "Denpasar",
  "Makassar",
  "Balikpapan",
];

const CreateItemPage = () => {
  const [form, setForm] = useState({
    name: "",
    weight: "",
    senderCity: "",
    receiverCity: "",
    address: "",
    senderId: "",
    receiverId: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        weight: parseFloat(form.weight),
      };
      await createItem(payload);
      alert("Item berhasil dibuat!");
      setForm({
        name: "",
        weight: "",
        senderCity: "",
        receiverCity: "",
        address: "",
        senderId: "",
        receiverId: "",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating item:", error.response?.data || error.message);
      alert("Gagal membuat item. Pastikan semua data sudah benar.");
    }
  };

  return (
    <div className="container">
      <h1>Buat Item Baru</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Barang"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Berat Barang (Kg)"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
          required
        />
        <select
          value={form.senderCity}
          onChange={(e) => setForm({ ...form, senderCity: e.target.value })}
          required
        >
          <option value="">Pilih Kota Asal</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          value={form.receiverCity}
          onChange={(e) => setForm({ ...form, receiverCity: e.target.value })}
          required
        >
          <option value="">Pilih Kota Tujuan</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Alamat Pengiriman"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nama Pengirim"
          value={form.senderId}
          onChange={(e) => setForm({ ...form, senderId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nama Penerima"
          value={form.receiverId}
          onChange={(e) => setForm({ ...form, receiverId: e.target.value })}
          required
        />
        <button type="submit">Buat Item</button>
      </form>
    </div>
  );
};

export default CreateItemPage;
