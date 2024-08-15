import React from 'react';
import axios from 'axios';

export default function LogoutButton(){

    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/logout', { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };


    function handleLogout() {
        logout();
        window.location.href = '/login';
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}