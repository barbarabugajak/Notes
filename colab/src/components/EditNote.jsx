import axios from 'axios';
import { getCookie } from '../util'

export default function EditNote({ note, setIsEditing }) {

    const handleSave = async () => {
        const URL = 'http://localhost:8000/api/notes/' + note.id
        const text = document.querySelector('textarea').value;
        const csrfToken = getCookie('csrftoken');
        try {
            const response = await axios.put(URL, {text: text}, { 
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            setIsEditing(false)
        } catch (error) {
            console.error('Error fetching data', error);
        }
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
            </div>
        </div>
    )
}