import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { database } from './FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import NewsLogo from '../asset/news-logo.png';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { debounce } from 'lodash'; 
export default function ButtonAppBar({ onSearch, onSort }) {
  const history = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAscending, setIsAscending] = useState(true); 

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    onSearch(query);
  }, 500);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    handleSearch(query);
  };

  const handleSort = () => {
    setIsAscending(!isAscending);
    onSort(isAscending);
  };

  const handleClick = () => {
    signOut(database).then((val) => {
      console.log(val, 'val');
      history('/');
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <img src={NewsLogo} alt="News Logo" style={{ marginRight: '10px', height: '40px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News Website
          </Typography>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: '200px',
              padding: '10px',
              fontSize: '16px',
              marginLeft: 'auto',
            }}
          />
          <Button color="inherit" onClick={handleSort}>
            Sort {isAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </Button>
          <Button color="inherit" onClick={handleClick}>
            LogOut <ExitToAppIcon sx={{ marginLeft: '5px' }} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
