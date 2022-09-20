import { AppBar, Button, Toolbar,Typography } from '@mui/material'
import { getAuth, signOut } from 'firebase/auth';
import React from 'react'

export default function Title({ title }) {
  const auth=getAuth();
  const handleLogout=()=>{
    signOut(auth).then(() => {
      console.log("Sign-out successful.")
    }).catch((error) => {
      alert(error.message)
    });
  }
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6'>{title}</Typography>
        <Button variant='contained' onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}
