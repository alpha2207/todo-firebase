import React, { useState } from 'react';

export default function GetTodo({ handleDelete, handleUpdate,toggleChange,todo }) {
    let [updatedTitle, setUpdatedTitle] = useState(null);

    return (
        <div>
            <input type="checkbox" onChange={e=>toggleChange(e.target.checked,todo.id)} />
            <input
                style={{ textDecoration: todo.info.completed ? "line-through" : '' }}
                value={updatedTitle === null ? todo.info.title : updatedTitle}
                placeholder='Enter Title'
                onChange={e => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleUpdate(updatedTitle, todo.id)}>Update</button>
        </div >
    )
}
