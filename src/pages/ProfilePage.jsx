import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext"; // Path yang benar

const ProfilePage = () => {
  const { logout } = useContext(AuthContext); // Ambil logout dari AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    alert("Logout berhasil!");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Profile</h1>
      <p>Selamat datang di halaman profil. Anda dapat logout dari akun Anda di sini.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
