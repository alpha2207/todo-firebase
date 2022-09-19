import { getDocs, collection, query, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';

export default function GetTodo() {
    let [docs, setDocs] = useState([]);
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "todo")), (doc) => {
            doc.forEach(e => {
                console.log(e.data());
                setDocs(p => [...p, { info: e.data(), id: e.id }])
            })
        });

        return () => unsub();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db,'todo',id));
    }

    const handleUpdate = async (id) => {
        await updateDoc(doc(db,'todo',id),{
            title:"Hola Ho"
        });
    }

    return (
        <div>
            {docs.map(e => {
                return (
                    <div>
                        <p
                            key={e.id}
                            style={{ textDecoration: e.info.completed ? "line-through" : '' }}
                        >
                            {e.info.title}
                        </p>
                        <button onClick={() => handleDelete(e.id)}>Delete</button>
                        <button onClick={()=>handleUpdate(e.id)}>Update</button>
                    </div>)
            })}
        </div>
    )
}
