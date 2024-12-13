import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="container">
    <h1>Selamat Datang di Website Logistik</h1>
    <p>Website ini membantu Anda mengirim barang dengan mudah dan cepat.</p>
    <div className="actions">
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  </div>
);

export default LandingPage;
