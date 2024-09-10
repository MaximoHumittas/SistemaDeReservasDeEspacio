import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intermediario from './screens/intermediario';
import Login from './screens/login';
import Home from './screens/home';
import Registro from './screens/registro';
import Unauthorized from './screens/unauthorized';
import { UserProvider } from './userContext';
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Intermediario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/*HOME COMPARTIDO ENTRE ESTUDIANTE Y DOCENTE*/}
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
