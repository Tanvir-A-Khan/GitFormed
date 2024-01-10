import { useState } from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';



function App() {
  

  return (
    <>
      <Navbar />
      <Signup />
      <Login></Login>
    </>
  )
}

export default App
