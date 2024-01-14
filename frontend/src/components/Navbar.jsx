import { signOut } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function NavScrollExample() {
  const navigate = useNavigate();
  console.log(localStorage.getItem('log'));



  const handleLogout = ()=>{
    signOut(auth)
    .then(()=>{
        console.log('signed out')
      
        localStorage.clear();
        navigate('/')
    }).catch((e)=>{
        console.log(e)
    })
}
  const handleSignup = (e)=>{
    e.preventDefault();
    navigate("/login")
  }
  const gotoHome = ()=>{
    navigate("/")
  }
  const handleAddRepo = ()=>{
    navigate("/createrepo")
  }
  const handleMyRepo = ()=>{
    navigate("/createrepo")
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary ps-5 pe-5">
      <Container fluid>
        <Navbar.Brand >GitFormed</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={gotoHome}>Home</Nav.Link>
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
            {
                 localStorage.getItem('log') 
                 ?
                 <Nav.Link className='p-2 w-50 ps-3' onClick={handleAddRepo}>Add Repo</Nav.Link>
                 :
                 null
            }
            {
                 localStorage.getItem('log') 
                 ?
                 <Nav.Link className='p-2 w-50' onClick={handleMyRepo}>My Repo</Nav.Link>
                 :
                 null
                }
            {
              localStorage.getItem('log') 
              ?
              <Nav.Link className='p-2 w-50' onClick={handleMyRepo}>Watch List</Nav.Link>
               
                 :
                 null
            }
            {
                 localStorage.getItem('log') 
                 ?
             
                 <Button className='bg-danger ms-2'onClick={handleLogout}>Logout</Button>
                
                 :
                 <Button className='bg-primary ms-2' onClick={handleSignup}>Login</Button>
               
            }
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;