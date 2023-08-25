import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQuery, useQueryClient } from 'react-query';

const fetchNewsItem = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const SingleNewsCard = ({ newsItem, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const queryClient = useQueryClient();

  const handleFavoriteToggle = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const queryKey = ['newsItem', newsItem.url];

 
  const { data: cachedNewsItem } = useQuery(queryKey, () => fetchNewsItem(newsItem.url), {
    initialData: () => {
     
      const cachedData = queryClient.getQueryData(queryKey);
      if (cachedData) {
        return cachedData;
      }
    },
  });

  if (!cachedNewsItem) {
    return null; 
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {cachedNewsItem.title}
        <IconButton color={isFavorite ? 'secondary' : 'default'} onClick={handleFavoriteToggle}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {cachedNewsItem.urlToImage && (
          <img src={cachedNewsItem.urlToImage} alt={cachedNewsItem.title} style={{ maxWidth: '100%' }} />
        )}
        <DialogContentText>{cachedNewsItem.description}</DialogContentText>
        <DialogContentText>{cachedNewsItem.content}</DialogContentText>
        <DialogContentText>Published at: {cachedNewsItem.publishedAt}</DialogContentText>
        <DialogContentText>Source: {cachedNewsItem.source.name}</DialogContentText>
        <DialogContentText>
          <a href={cachedNewsItem.url} target="_blank" rel="noopener noreferrer">
            Read more...
          </a>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SingleNewsCard;
