
export default function EditNote({ note, setIsEditing }) {
    return (
        <div className="card" style={{ border: 'None'}}>
            <div className="card-header">
                {note.name}
            </div>
            <div className="card-body">
                <textarea className="card-text" style={{ width: '100%', height: '200px'}} defaultValue={note.text}></textarea>
                <button className="btn btn-primary" 
                    onClick={() => {
                        setIsEditing(false)
                        console.log(isEditing)
                    }}
                >Save</button>
            </div>
        </div>
    )
}