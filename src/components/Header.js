import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, } from '@material-ui/core';

const Header = () => {
  return (
    <AppBar id="header" position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">The Shoppies</Typography>
      </Toolbar>
    </AppBar>
  )
}
export default Header;