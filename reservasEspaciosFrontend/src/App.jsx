import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intermediario from './intermediario';
import Login from './login';
import Home from './home';
import { UserProvider } from './userContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Intermediario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
