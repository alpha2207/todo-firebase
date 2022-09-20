import { AppBar, Toolbar,Typography } from '@mui/material'
import React from 'react'

export default function Title({ title }) {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6'>{title}</Typography>
      </Toolbar>
    </AppBar>
  )
}
