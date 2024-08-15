import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "./LogoutButton";
import { fetchUser } from "../util";

axios.defaults.withCredentials = true;

export default function Dashboard(){
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        let userdata = fetchUser();
        userdata.then((data) => {
            setUsername(data[0]);
            setId(data[1]);
        });
    }, []);

    const fetchData = async () => {
        try {
            const URL = 'http://localhost:8000/api/notes/user/' + id
            const response = await axios.get(URL, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);


    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard, {username && username}</p>
            <LogoutButton />
        </div>
    )
}