import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    async function handleRegister() {
        console.log('Registering user...');
        
    }

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