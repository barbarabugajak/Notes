import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteButton from './DeleteButton';

export default function NoteShort({ note }) {

    const fixString = (str, maxLength) => {
        if (str.length > maxLength) {
          return str.slice(0, maxLength) + '...';
        }
        return str;
      };


    return (
        <div className="card">
            <div className="card-header">
                {note.name}
            </div>
            <div className="card-body">
                <p className="card-text">{fixString(note.text, 100)}</p>
                <a href={"/note/" + note.id}  className="btn btn-primary">View</a>
                <DeleteButton id={note.id} />
            </div>
        </div>
    )
}