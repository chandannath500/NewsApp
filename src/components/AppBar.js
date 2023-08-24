import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { database } from './FirebaseConfig';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import NewsLogo from '../asset/news-logo.png'; 

export default function ButtonAppBar() {
  const history = useNavigate();

  const handleClick = () => {
    signOut(database).then(val => {
      console.log(val, "val");
      history('/');
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* News Logo */}
          <img src={NewsLogo} alt="News Logo" style={{ marginRight: '10px', height: '40px' }} />

          {/* News Website Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News Website
          </Typography>

          {/* LogOut Button with Icon */}
          <Button color="inherit" onClick={handleClick}>
            LogOut <ExitToAppIcon sx={{ marginLeft: '5px' }} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
