import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TogglePublicButton({ noteId, isPublic }) {
    const className = isPublic ? "btn btn-success" : "btn btn-warning";
    return (
        <div>
            <button type="button" 
                className= {className}
                style={{
                    marginLeft: '1%',
                    marginTop: '1%',
                }}
                >{isPublic ? "Make Private" : "Make Public"}</button>
        </div>
    )
}