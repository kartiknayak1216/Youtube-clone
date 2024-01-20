import React from 'react';
import { Stack, Box } from '@mui/material';
import VideoCard from './videoCard';
import ChannelCard from './channelCard';

export default function Videos({ videos }) {
  console.log({ videos });

  return (
    <>
      <Stack direction='row' flexWrap='wrap' justifyContent='start' gap={2}>
        {videos && Array.isArray(videos) && videos.length > 0 ? (
          videos.map((item, idx) => (
            <Box key={idx}>
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard  channelDetail={item} />}
            </Box>
          ))
        ) : (
          <div>No videos available</div>
        )}
      </Stack>
    </>
  );
}
