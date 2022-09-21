import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
export default function Register() {
    let [user, setUser] = useState({
        email: '',
        password: ''
    });

    const auth = getAuth();

    const handleInputChange = (e) => {
        setUser(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleLogin = async () => {
        try{
            let userCred = await createUserWithEmailAndPassword(auth, user.email, user.password);
            console.log(userCred.user);
        }
        catch(err){
            alert(err.code);
        }
    }
    return (
        <div>
            <h2>Register</h2>
            <input onChange={handleInputChange} placeholder='Enter Your Name' type="text" name='name'  /><br></br>
            <input onChange={handleInputChange} placeholder='Enter Your Email' type="email" name='email' /><br></br>
            <input onChange={handleInputChange} placeholder='Enter Your Password' type="password" name='password' /><br></br>
            <button onClick={handleLogin}>Register</button>
        </div>
    )
}
