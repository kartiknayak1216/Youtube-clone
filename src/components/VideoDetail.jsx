import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { fetch } from '../utils/fetchFromAPI';
import { CheckCircle } from '@mui/icons-material';
import Videos from './videos';

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await fetch(`videos?part=snippet,statistics&id=${id}`);
        const relatedVideosData = await fetch(`search?part=snippet&relatedToVideoId=${id}&type=video`);

        setVideoDetails(videoData.items[0]);
        setRelatedVideos(relatedVideosData.items);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleToggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" />
            <Typography variant="h5" mt={2} mb={1}>
              {videoDetails?.snippet?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                color: '#fff',
                borderBottom: '1px solid #ccc',
                pb: 1,
                marginBottom: 2,
              }}
              px={2}
            >
              <Link to={`/channel/${videoDetails?.snippet?.channelId}`}>
                <Typography variant="subtitle1" color="#fff">
                  {videoDetails?.snippet?.channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction="row" spacing={2}>
                <Typography variant="body2" color="gray">
                  Views: {videoDetails?.statistics?.viewCount}
                </Typography>
                <Typography variant="body2" color="gray">
                  Likes: {videoDetails?.statistics?.likeCount}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="body1" color="#fff" px={2} overflow="hidden" whiteSpace="pre-wrap">
              {isDescriptionExpanded
                ? videoDetails?.snippet?.description
                : videoDetails?.snippet?.description.slice(0, 150) + '...'}
            </Typography>
            <Button variant="text" color="primary" onClick={handleToggleDescription}>
              {isDescriptionExpanded ? 'Show Less' : 'Show More'}
            </Button>
          </Box>
        </Box>
        {/* Related Videos Section */}
        <Box minWidth={{ md: '300px' }} p={2} sx={{ overflowY: 'auto', maxHeight: 'calc(95vh - 86px)' }}>
          <Typography variant="h6" mb={2}>
            Related Videos
          </Typography>
          <Box maxWidth={'300px'}>
            <Videos videos={relatedVideos} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
