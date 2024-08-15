import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Dashboard(){
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user', { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };


    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard, {username && username}</p>
            {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
    )
}