import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { fetchNote } from '../util';
import { useEffect, useState } from 'react';

export default function Note() {
    const { id } = useParams();

    const [note, setNote] = useState(null);

    useEffect(() => {   
        let noteData = fetchNote(id);
        noteData.then((data) => {
            setNote(data);
        });
    }, [id]);
    if (note){
        return (
            <div className="card">
                <div className="card-header">
                    {note.name}
                </div>
                <div className="card-body">
                    <p className="card-text">note.text, 100</p>
                    <a href="#" className="btn btn-primary">Edit</a>
                </div>
            </div>
        )
    } else {
        <h1>Loading...</h1>
    }
}