import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUser, getCookie, fetchAllUsers } from '../util'

export default function NewNote() {
    const [noteName, setNoteName] = useState('')
    const [noteText, setNoteText] = useState('')
    const [ID, setId] = useState(null);
    
    useEffect(() => {
        let userdata = fetchUser();
        userdata.then((data) => {
            setId(data[1]);
        });
    }, []);

    useEffect(() => {
        let allUsers = fetchAllUsers();
        allUsers.then((data) => {
            console.log(data);
        });
    }, []);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = getCookie('csrftoken'); // Ensure this function correctly retrieves the CSRF token
        console.log(csrfToken);
        axios.post('http://localhost:8000/api/notes', {
            name: noteName,
            text: noteText,
            owner: ID,
        }, { 
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data', error);
        });
    };


    return (
        <div className="container">
            <h1>New Note</h1>

                <div className="mb-3">
                    <label htmlFor="noteName" className="form-label">Note Name</label>
                    <input type="text" className="form-control" id="noteName" onChange={(e) => setNoteName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="noteText" className="form-label">Note Text</label>
                    <textarea className="form-control" id="noteText" rows="3" onChange={(e) => setNoteText(e.target.value)}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    )
}