import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Assuming Firebase has been initialized
import { auth } from '../firebase';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = (e) => {
        e.preventDefault();



        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // If the signup is successful, you may perform additional actions here, e.g., update user profile with the username
                // Example: updateProfile(auth.currentUser, { displayName: username });

                // Clear input fields and reset error state upon successful signup
                console.log(userCredential);
                setEmail('');
                setPassword('');
                setUsername('');
                setError(null);

                
            })
            .catch((err) => {
                setError(err.message); // Set the error message state if signup fails
            });
    };

    return (
        <div className='m-5 p-5'>
            <Form>
                <h1>Register yourself</h1>
                <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        <p>We will never share your email with anyone else.</p>
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3"  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Button variant="primary" type="submit" onClick={handleSignup}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Signup;
