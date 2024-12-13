import { useState } from "react";
import { checkShipping } from "../services/api";

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

const CheckShippingPage = () => {
  const [form, setForm] = useState({
    name: "",
    weight: "",
    senderCity: "",
    receiverCity: "",
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await checkShipping(form);
      setResult(response.data);
    } catch (error) {
      alert("Gagal mengecek ongkir!");
    }
  };

  return (
    <div className="container">
      <h1>Cek Ongkos Kirim</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Barang"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Berat Barang (Kg)"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
        />
        <select
          value={form.senderCity}
          onChange={(e) => setForm({ ...form, senderCity: e.target.value })}
        >
          <option value="">Pilih Kota Pengirim</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          value={form.receiverCity}
          onChange={(e) => setForm({ ...form, receiverCity: e.target.value })}
        >
          <option value="">Pilih Kota Penerima</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button type="submit">Cek Ongkir</button>
      </form>

      {result && (
        <div className="result">
          <h2>Hasil Ongkir</h2>
          <table>
            <tbody>
              <tr>
                <th>Nama Barang</th>
                <td>{result.name}</td>
              </tr>
              <tr>
                <th>Berat</th>
                <td>{result.weight} Kg</td>
              </tr>
              <tr>
                <th>Kota Asal</th>
                <td>{result.senderCity}</td>
              </tr>
              <tr>
                <th>Kota Tujuan</th>
                <td>{result.receiverCity}</td>
              </tr>
              <tr>
                <th>Ongkos Kirim</th>
                <td>Rp {result.shippingFee.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CheckShippingPage;
