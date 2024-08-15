import 'bootstrap/dist/css/bootstrap.min.css';

export default function NoteShort({ note }) {

    return (
        <div className="card">
            <div className="card-header">
                {note.name}
            </div>
            <div className="card-body">
                <p className="card-text">{note.text}</p>
                <a href="#" className="btn btn-primary">Edit</a>
            </div>
        </div>
    )
}