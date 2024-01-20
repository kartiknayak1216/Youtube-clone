import { IconButton, Paper } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
  const [data, setData] = useState("");
  const navigate = useNavigate(); // Corrected from navigate

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${data}`);
  };

  return (
    <Paper
      component="form"
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
      }}
      onSubmit={handleSubmit}
    >
      <input
        className='search-bar'
        placeholder='Search...'
        value={data}
        onChange={handleChange}
      />
      <IconButton type="submit" sx={{ p: '10px', color: 'red' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
