import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TogglePublicButton({ noteId, isPublic }) {

    return (
        <div>
            <button type="button" 
                className="btn btn-secondary"
                style={{
                    marginLeft: '1%',
                    marginTop: '1%'
                }}
                >{isPublic ? "Make Private" : "Make Public"}</button>
        </div>
    )
}