import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { fetchNote } from '../util';
import { useEffect, useState } from 'react';
import EditNote from './EditNote';

export default function Note() {
    const { id } = useParams();

    const [note, setNote] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {   
        let noteData = fetchNote(id);
        noteData.then((data) => {
            setNote(data);
        });
    }, [id, isEditing]);


    if (note){
        return (
            <div className='container'>
                {isEditing ? (
                    <EditNote note={note} setIsEditing={setIsEditing} />
                ) : (
                    <div className="card" style={{ border: 'None'}}>
                        <div className="card-header">
                            {note.name}
                        </div>
                        <div className="card-body">
                            <p className="card-text">{note.text}</p>
                            <button className="btn btn-primary" onClick={() => {
                                setIsEditing(true)
                                console.log(isEditing)
                            }}>Edit</button>
                        </div>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}