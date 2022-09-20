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
            {user.email} {user.password}
            <input onChange={handleInputChange} type="email" name='email' />
            <input onChange={handleInputChange} type="password" name='password' />
            <button onClick={handleLogin}>Register</button>
        </div>
    )
}
