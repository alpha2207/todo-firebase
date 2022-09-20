import React, { useState } from 'react';

export default function Addtodo({handlesubmit}) {
    const [title, setTitle] = useState('');
    
    const handleInputSubmit=(e)=>{
        e.preventDefault();
        handlesubmit(title);
        setTitle('');
    }

  return (
    <form onSubmit={handleInputSubmit}>
        <input type="text" placeholder='Enter Todo...' value={title} onChange={e=>setTitle(e.target.value)} />
        <button>Add</button>
    </form>
  )
}
