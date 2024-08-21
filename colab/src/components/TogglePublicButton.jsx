import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {editNote} from '../util';

export default function TogglePublicButton({ noteId, isPublic }) {
    const className = isPublic ? "btn btn-success" : "btn btn-warning";

    const handleClick = () => {
        const data = {
            public: !isPublic
        }
        editNote(data, noteId)
        window.location.reload();
    }
    return (
        <div>
            <button type="button" 
                className= {className}
                style={{
                    marginLeft: '1%',
                    marginTop: '1%',
                }}
                onClick = {handleClick}
                >{isPublic ? "Make Private" : "Make Public"}</button>
        </div>
    )
}