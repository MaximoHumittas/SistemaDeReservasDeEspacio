import { useState } from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'


import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import CalendarPage from './pages/CalendarPage'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ApplicationPage from './pages/ApplicationPage'
import AdministrationTablePage from './pages/AdmistrationPage'

import './App.css'


function App() {


  return (
    <div>
      
      <BrowserRouter>

        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/user' element={<UserPage/>} />
          <Route path='/calendar' element={<CalendarPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/applications' element={<ApplicationPage/>} />     
          <Route path='/administration' element={<AdministrationTablePage/>}/>     
        </Routes>
      
      </BrowserRouter>

    </div>
  )
}

export default App
