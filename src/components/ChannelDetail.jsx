import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetch } from '../utils/fetchFromAPI';
import { Box } from '@mui/material';
import ChannelCard from './channelCard';
import Video from './videos';

export default function ChannelDetail() {
  const { id } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`channels?part=snippet&id=${id}`);
        const vid = await fetch(`search?channelId=${id}&part=snippet&order=date`);
        console.log(data); // This will log the resolved data
        setChannelData(data.items[0]); // Store the data in state if needed
        setVideos(vid.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box minHeight="95vh" color="rgb(0,0,0)">
      <Box>
        <div style={{
          
          background: 'linear-gradient(90deg, rgba(2,0,36,1) 2%, rgba(9,53,121,0.6980042016806722) 60%, rgba(0,212,255,1) 100%)',
          zIndex: 10, height: '200px'
        }} />
        <ChannelCard
          channelDetail={channelData}
          mediaStyles={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}
          cardStyles={{ textAlign: 'center', marginTop: '10px' }} // Adjust marginTop to create space
          titleStyles={{ position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)' }}
          subscriberStyles={{ position: 'absolute', top: '56%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px', marginLeft: 'auto', marginRight: 'auto' }}>
          <Video videos={videos} />
        </Box>
      </Box>
    </Box>
  );
}
