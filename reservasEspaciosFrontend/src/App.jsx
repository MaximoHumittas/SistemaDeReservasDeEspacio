import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Formulary from "./pages/FormularyPage";
import AuthProvider from "./context/AuthContext";
import About from "./pages/AboutPage";
import LoginGenerico from "./pages/LoginGenerico";
import ReclamoForm from "./pages/ReclamoForm";

import Profile from "./pages/Profile";

import Footer from "./components/Footer";

import "./scss/index.scss"

export default function App() {
    return (
        <AuthProvider >
            <div className="app-container">

            
                <Router>
                    <NavBar />

                    <Routes>

                        <Route path="/" element={<HomePage /> } />

                        <Route path="/about" element={<About />} />

                        <Route path="/formulary" element={<Formulary />} />

                        <Route path="/login-generico" element={<LoginGenerico />} />

                        <Route path="/reclamo" element={<ReclamoForm />} />

                    
                        <Route path="/profile" element={<Profile />} />
                    </Routes>

                    <Footer></Footer>


                </Router>

            </div>
        </AuthProvider>
    );
}
