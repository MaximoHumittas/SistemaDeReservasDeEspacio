import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar";
import Login from "./pages/LoginPage";
import Calendary from "./pages/CalendaryPage";
import Formulary from "./pages/FormularyPage";

export default function App() {
    return (

        <Router>

            <NavBar/>

            <Routes>

                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/calendary" element={<Calendary/>}/>
                <Route path="/formulary" element={<Formulary/>} />

            </Routes>

        </Router>
    )
}