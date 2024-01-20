import React from 'react';
import { CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/const';

const ChannelCard = ({ channelDetail, cardStyles, mediaStyles, titleStyles, subscriberStyles }) => (
  <Link to={`/channel/${channelDetail?.id?.channelId}`}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#fff', ...cardStyles }}>
      <CardMedia
        image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
        alt={channelDetail?.snippet?.title}
        sx={{
          borderRadius: '50%',
          height: '180px',
          width: '180px',
          mb: 2,
          border: '1px solid #e3e3e3',
          ...mediaStyles,
        }}
      />
      <Typography variant="h6" sx={{ ...titleStyles }}>
        {channelDetail?.snippet?.title}{' '}
        <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
      </Typography>
      {channelDetail?.statistics?.subscriberCount && (
        <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray', ...subscriberStyles }}>
          {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
        </Typography>
      )}
    </CardContent>
  </Link>
);

// Default props to provide fallback values
ChannelCard.defaultProps = {
  cardStyles: {}, // Customize card container styles
  mediaStyles: {}, // Customize media (image) styles
  titleStyles: {}, // Customize title text styles
  subscriberStyles: {}, // Customize subscriber count text styles
};

export default ChannelCard;
