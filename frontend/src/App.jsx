import Navbar from './components/Navbar'
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/Footer';
import CreateRepo from './components/CreateRepo';




function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>        
        <Route path='/' element={<Home />} >
        </Route>
          <Route path='/createrepo' element={<CreateRepo />} />
        <Route path='/signup' element={<Signup />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Signup/>} />
      </Routes>

      <Footer/>

     

    </BrowserRouter>
  )
}

export default App
