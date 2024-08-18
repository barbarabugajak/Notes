import React from 'react'
import { handleDelete } from '../util'

export default function DeleteButton({ id }) {

    const handleClick = () => {
        handleDelete(id)
    }

    return (
        <button className="btn btn-danger"
            style={{
                marginLeft: '1%'
            }}
            onClick={handleClick}>Delete</button>
    )
}