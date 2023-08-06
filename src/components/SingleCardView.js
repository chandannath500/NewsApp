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

const SingleNewsCard = ({ newsItem, onClose }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite(prevIsFavorite => !prevIsFavorite);
        // You can add Firebase logic here to update the user's favorite status
    };
    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {newsItem.title}
                <IconButton color={isFavorite ? 'secondary' : 'default'} onClick={handleFavoriteToggle}>
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {newsItem.urlToImage && (
                    <img src={newsItem.urlToImage} alt={newsItem.title} style={{ maxWidth: '100%' }} />
                )}
                <DialogContentText>{newsItem.description}</DialogContentText>
                <DialogContentText>{newsItem.content}</DialogContentText>
                <DialogContentText>Published at: {newsItem.publishedAt}</DialogContentText>
                <DialogContentText>Source: {newsItem.source.name}</DialogContentText>
                <DialogContentText>
                    <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
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
