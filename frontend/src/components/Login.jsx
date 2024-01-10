import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Assuming Firebase has been initialized

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth(); // Accessing authentication instance

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successfully logged in
                // Perform actions after login if needed
                console.log('Logged in:', userCredential.user);

                // Clear input fields and reset error state upon successful login
                localStorage.setItem('email', email)
                setEmail('');
                setPassword('');
                setError(null);
            })
            .catch((err) => {
                setError(err.message); // Set the error message state if login fails
            });
    };

    return (
        <div className='m-5 p-5'>
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
            </Form>
        </div>
    );
}

export default Login;
