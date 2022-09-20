import React, { useState } from 'react';
import { Button, List, Checkbox, ListItem, InputBase } from '@mui/material'
export default function GetTodo({ handleDelete, handleUpdate, toggleChange, todo }) {
    let [updatedTitle, setUpdatedTitle] = useState(null);

    return (
        <div>
            <Checkbox defaultChecked={todo.completed} type="checkbox" onChange={e => toggleChange(todo)} />
            <InputBase
                defaultChecked={todo.completed}
                style={{ textDecoration: todo.info.completed ? "line-through" : '' }}
                value={updatedTitle === null ? todo.info.title : updatedTitle}
                placeholder='Enter Title'
                onChange={e => setUpdatedTitle(e.target.value)}
            />
            <Button variant='contained' color='error' sx={{ m: 2 }} onClick={() => handleDelete(todo.id)}>Delete</Button>
            <Button variant='outlined' color='success' onClick={() => handleUpdate(updatedTitle, todo.id)}>Update</Button>
        </div>
    )
}
