import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "./LogoutButton";
import { fetchUser } from "../util";
import NoteShort from "./NoteShort";
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredentials = true;

export default function Dashboard(){
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);
    const [notes, setNotes] = useState([]);

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
            setNotes(response.data);
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
        <div className="container">
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard, {username && username}</p>
            <h2>Your Notes</h2>
            <button type="button" className="btn btn-primary" onClick={() => window.location.href = "/new"}>Add a new note</button>
            {notes.map((note) => (
                <NoteShort key={note.id} note={note} />
            ))}

            <LogoutButton />


        </div>
    )
}