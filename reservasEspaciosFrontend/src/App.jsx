//App.jsx:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intermediario from './screens/intermediario';
import Login from './screens/login';
import Home from './screens/home';
import Registro from './screens/registro';
import Unauthorized from './screens/unauthorized';
import { UserProvider } from './userContext';
import PrivateRoute from './components/privateRoute';
import Navbar from './components/navbar';
import CalendarPage from './screens/CalendarPage';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />


          {/*HOME COMPARTIDO ENTRE ESTUDIANTE Y DOCENTE*/}

          

          <Route path="/home" element={
            <PrivateRoute>
              <Navbar/>
              <Home />
            </PrivateRoute>
          } />
          

          <Route path="/calendar" element={
            <PrivateRoute>
              <Navbar />
              <CalendarPage />
            </PrivateRoute>
          } />
          
        
          

          {/* 

          <Route element={<PrivateRoute>
            <Navbar/>
          </PrivateRoute>
          }
          >
            <Route path='/home' element={<Home/>} />
            <Route path='/calendar' element={<CalendarPage/>} />
          </Route>
          
          
          */}
          

          


          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;