import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Assuming Firebase has been initialized
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                console.log('Logged in:', userCredential.user);

                localStorage.setItem('log', true)
                setEmail('');
                setPassword('');
                setError(null);
                navigate('/')

            })
            .catch((err) => {
                setError(err.message); 
            });
    };

    return (
        <div className='m-5 p-5  rounded w-50 m-auto'>
            <Form onSubmit={handleLogin}>
                <h1>Login to get the most out of it</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <p>Dont have an account? <Link to='/registration'>Registration</Link></p>
            </Form>
        </div>
    );
}

export default Login;
