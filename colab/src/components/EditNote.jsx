import axios from 'axios';
import { getCookie, editNote } from '../util'

export default function EditNote({ note, setIsEditing }) {

    const handleSave = () => {
        const data = {
            name: note.name,
            text: document.querySelector('textarea').value
        }
        editNote(data, note.id)
        setIsEditing(false)
    }

    return (
        <div className="card" style={{ border: 'None'}}>
            <div className="card-header">
                {note.name}
            </div>
            <div className="card-body">
                <textarea className="card-text" style={{ width: '100%', height: '200px'}} defaultValue={note.text}></textarea>
                <button className="btn btn-primary" 
                    onClick={handleSave}
                >Save</button>
                <button className="btn btn-secondary" 
                    onClick={() => setIsEditing(false)}
                    style={{ marginLeft: '10px'}}
                >Cancel</button>

            </div>
        </div>
    )
}