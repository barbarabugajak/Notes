import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUser, getCookie, fetchAllUsers } from '../util'

export default function NewNote() {
    const [noteName, setNoteName] = useState('')
    const [noteText, setNoteText] = useState('')
    const [noteCollaborators, setNoteCollaborators] = useState([])

    const [ID, setId] = useState(null);
    const [allUsers, setAllUsers] = useState([]);


    useEffect(() => {
        let userdata = fetchUser();
        userdata.then((data) => {
            setId(data[1]);
        });
    }, []);

    useEffect(() => {
        let allUsers = fetchAllUsers();
        allUsers.then((data) => {
            console.log(data, ID);
            setAllUsers(data.filter((user) => user.id !== ID));
        });
    }, [ID]);

    useEffect(() => {
    
    }, [allUsers]);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = getCookie('csrftoken'); // Ensure this function correctly retrieves the CSRF token
        console.log(csrfToken);
        axios.post('http://localhost:8000/api/notes', {
            name: noteName,
            text: noteText,
            owner: ID,
            collaborators: noteCollaborators
        }, { 
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data);
            alert('Note created successfully');
            window.location.href = '/';
            
        })
        .catch((error) => {
            console.error('Error fetching data', error);
        });
    };


    return (
        <div className="container">
            <h1 style={{ marginTop: '1%', marginBottom: '1%' }}>New Note</h1>

            <div className="mb-3">
                <label htmlFor="noteName" className="form-label">Note Name</label>
                <input type="text" className="form-control" id="noteName" onChange={(e) => setNoteName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="noteText" className="form-label">Note Text</label>
                <textarea className="form-control" id="noteText" rows="3" onChange={(e) => setNoteText(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="noteText" className="form-label">Public: </label>
                <input type='checkbox' style={{ marginLeft: '10px' }}></input>
            </div>

            <div className="mb-3">
                <label htmlFor="noteOwner" className="form-label">Note Collaborators</label>
                {allUsers.map((user) => (
                    <div key={user.id}>
                        <input className="form-check-input" type="checkbox" name="noteOwner" id={user.id} value={user.id}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setNoteCollaborators([...noteCollaborators, user.id]);
                                } else {
                                    setNoteCollaborators(noteCollaborators.filter((id) => id !== user.id));
                                }
                            }} />
                        <label className="form-check-label" htmlFor={user.id} style={{ marginLeft: '10px' }}>
                            {user.username}
                        </label>
                    </div>
                ))}
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            <button type="button" className="btn btn-secondary" style={{ marginLeft: '10px' }}
                onClick={() => window.location.href = "/"}>Cancel</button>
        </div>
    )
}