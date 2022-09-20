import { getDocs, collection, query, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';

export default function GetTodo({ handleDelete, handleUpdate }) {
    let [docs, setDocs] = useState([]);
    let [isDisabled, setIsDisabled] = useState(true);
    let [updatedTitle, setUpdatedTitle] = useState(null);
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "todo")), (doc) => {
            doc.forEach(e => {
                console.log(e.data());
                setDocs(p => [...p, { info: e.data(), id: e.id }])
            })
        });

        return () => unsub();
    }, []);

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
