import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/styles/global.css";
import AuthProvider from "./services/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Router />
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
