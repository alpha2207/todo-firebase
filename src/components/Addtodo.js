import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../Firebase';

export default function Addtodo() {
    const [title, setTitle] = useState('');
    const handlesubmit=async (e)=>{
        e.preventDefault();
        if(title!==''){
            await addDoc(collection(db,"todo"),{
                title,
                completed:false
            })
            setTitle('');
        }else{
            alert("Title is empty!")
        }
    }
  return (
    <form onSubmit={handlesubmit}>
        <input type="text" onChange={e=>setTitle(e.target.value)} />
        <button>Add</button>
    </form>
  )
}
