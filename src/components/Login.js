import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'

export default function Login() {
    let [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setUser(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const auth = getAuth();

    const handleLogin = async () => {
        try {
            let userInfo = await signInWithEmailAndPassword(auth, user.email, user.password);
            console.log(userInfo);
        }
        catch(err){
            console.log(err.message);
            alert(err.code);
        }
    }
    return (
        <div>
             <h2>Login</h2>
            {user.email} {user.password}
            <input onChange={handleInputChange} type="email" name='email' />
            <input onChange={handleInputChange} type="password" name='password' />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
