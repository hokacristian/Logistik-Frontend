import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { createItem } from "../services/api";

const cities = [
  { value: "Jakarta", label: "Jakarta" },
  { value: "Bandung", label: "Bandung" },
  { value: "Surabaya", label: "Surabaya" },
  { value: "Semarang", label: "Semarang" },
  { value: "Yogyakarta", label: "Yogyakarta" },
  { value: "Malang", label: "Malang" },
  { value: "Medan", label: "Medan" },
  { value: "Denpasar", label: "Denpasar" },
  { value: "Makassar", label: "Makassar" },
  { value: "Balikpapan", label: "Balikpapan" },
];

const CreateItemPage = () => {
  const [form, setForm] = useState({
    name: "",
    weight: "",
    senderCity: null,
    receiverCity: null,
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
        senderCity: form.senderCity?.value,
        receiverCity: form.receiverCity?.value,
      };
      await createItem(payload);
      alert("Item berhasil dibuat!");
      setForm({
        name: "",
        weight: "",
        senderCity: null,
        receiverCity: null,
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
        <Select
          placeholder="Pilih Kota Asal"
          options={cities}
          value={form.senderCity}
          onChange={(selectedOption) =>
            setForm({ ...form, senderCity: selectedOption })
          }
        />
        <Select
          placeholder="Pilih Kota Tujuan"
          options={cities}
          value={form.receiverCity}
          onChange={(selectedOption) =>
            setForm({ ...form, receiverCity: selectedOption })
          }
        />
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
