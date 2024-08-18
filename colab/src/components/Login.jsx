import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                username,
                password
            }, { withCredentials: true });
            console.log(response);
            setMessage('Login successful');
            setInterval(() => {
                window.location.href = '/';
            }, 1000);
        } catch (error) {
            console.log(error)
            setMessage('Login failed');
        }
    };


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <small>You don't have an account? <a href="/register">Register!</a></small>
        </div>
    );
}