import { useState, useContext } from "react";
import { login as apiLogin } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext"; // Path yang benar

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // Ambil login dari AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiLogin({ email, password });
      login(response.data.token); // Set token di context
      alert("Login berhasil!");
      navigate("/dashboard");
    } catch (error) {
      alert("Login gagal!");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
