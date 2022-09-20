import React, { useState } from 'react';

export default function GetTodo({ handleDelete, handleUpdate, isUpdating, docs }) {
    let [isDisabled, setIsDisabled] = useState(true);
    let [updatedTitle, setUpdatedTitle] = useState(null);

    return (
        <div>
            {docs.map(e => {
                return (
                    <div>
                        {updatedTitle}
                        <input
                            key={e.id}
                            style={{ textDecoration: e.info.completed ? "line-through" : '' }}
                            value={updatedTitle === null ? e.info.title : updatedTitle}
                            placeholder='Enter Title'
                            disabled={isDisabled}
                            onChange={e => setUpdatedTitle(e.target.value)}
                        />
                        {!isDisabled && <button onClick={() => handleUpdate(updatedTitle, e.id)}>Confirm Update</button>}
                        <button onClick={() => handleDelete(e.id)}>Delete</button>
                        <button onClick={() => setIsDisabled(false)}>Update</button>
                    </div>)
            })}
        </div>
    )
}
