import { useState } from "react";
import Select from "react-select";
import { checkShipping } from "../services/api";

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

const CheckShippingPage = () => {
  const [form, setForm] = useState({
    name: "",
    weight: "",
    senderCity: null,
    receiverCity: null,
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await checkShipping({
        ...form,
        senderCity: form.senderCity?.value,
        receiverCity: form.receiverCity?.value,
      });
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
        <Select
          placeholder="Pilih Kota Pengirim"
          options={cities}
          value={form.senderCity}
          onChange={(selectedOption) =>
            setForm({ ...form, senderCity: selectedOption })
          }
        />
        <Select
          placeholder="Pilih Kota Penerima"
          options={cities}
          value={form.receiverCity}
          onChange={(selectedOption) =>
            setForm({ ...form, receiverCity: selectedOption })
          }
        />
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
