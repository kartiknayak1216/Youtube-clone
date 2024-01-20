import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Videos from './videos';
import { fetch } from '../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';

const Searchfeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    setVideos(null);
    fetch(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {`Search results for: ${searchTerm}`} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Searchfeed;
