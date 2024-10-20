import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthProvider from "./context/AuthContext";
import About from "./pages/AboutPage";
import Formulary from "./pages/FormularyPage";
import HomePage from "./pages/HomePage";
import LoginGenerico from "./pages/LoginGenerico";
import ReclamoForm from "./pages/ReclamoForm";
import './styles/index.css';

export default function App() { 
  return ( 
    <AuthProvider> 
      <Router> 
        <NavBar /> 
        <Routes> 
          <Route path="/" element={<HomePage />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/formulary" element={<Formulary />} /> 
          <Route path="/login-generico" element={<LoginGenerico />} /> 
          <Route path="/reclamo" element={<ReclamoForm />} />
        </Routes> 
      </Router> 
    </AuthProvider> 
  ); 
}