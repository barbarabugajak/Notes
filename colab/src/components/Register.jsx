import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCookie } from '../util';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null)

    const handleRegister = (e) => {
        e.preventDefault();
        const csrfToken = getCookie('csrftoken'); // Ensure this function correctly retrieves the CSRF token
        console.log(csrfToken);
        axios.post('http://localhost:8000/api/register', {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        }, { 
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.statusText === 'Created') {
                window.location.href = '/login';
            }
        })
        .catch((error) => {
            console.error('Error fetching data', error);
            if (error.response.data.username) {
                setError('A user with that username already exists');
            }
        });
    };

    return (
        <div className="container"
            style={{
                width: '50%',
                margin: 'auto',
                marginTop: '50px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px'    
            }}>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <h1 style={{ marginBottom: "2%" }}>Register</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <p></p>
            <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
            <p></p>
            <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
            <p></p>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <p></p>
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
        </div>
    )
}