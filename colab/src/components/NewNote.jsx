
export default function NewNote() {
    return (
        <div className="container">
            <h1>New Note</h1>
            <form>
                <div className="mb-3">
                    <label for="noteName" className="form-label">Note Name</label>
                    <input type="text" className="form-control" id="noteName" />
                </div>
                <div className="mb-3">
                    <label for="noteText" className="form-label">Note Text</label>
                    <textarea className="form-control" id="noteText" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}