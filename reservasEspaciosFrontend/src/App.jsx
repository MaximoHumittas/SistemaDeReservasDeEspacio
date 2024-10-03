import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Formulary from "./pages/FormularyPage";
import AuthProvider from "./context/AuthContext";
import About from "./pages/AboutPage";


export default function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />

                <Routes>


                    <Route path="/" element={<HomePage /> } />

                    <Route path="/about" element={<About />} />

                    <Route path="/formulary" element={<Formulary />} />


                </Routes>
            </Router>
        </AuthProvider>
    );
}
