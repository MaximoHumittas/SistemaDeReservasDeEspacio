import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intermediario from './screens/intermediario';
import Login from './screens/login';
import Home from './screens/home';
import { UserProvider } from './userContext';

const routes = {
  home: "/home",
  login: "/login",
  intermediario: "/"
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path={routes.intermediario} element={<Intermediario />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.home} element={<Home />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
