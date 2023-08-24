import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../redux/features/newsSlice';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ButtonAppBar from './AppBar';
import NewsLogo from '../asset/news-logo.png';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Hidden } from '@mui/material';
import SingleCardView from './SingleCardView';

const NewsCard = () => {
    const { news, loading, error } = useSelector(state => state.news);
    const dispatch = useDispatch();
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [clickedCardId, setClickedCardId] = useState(null); 
    useEffect(() => {
        dispatch(getNews());
    }, []);

    const handleMoreClick = (id) => {
        setClickedCardId(id); // Set the clicked card ID
    };

       const toggleViewMode = (event, newViewMode) => {
        setViewMode(newViewMode);
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <div>Loading...</div>
            </Box>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!news || !news.articles || news.articles.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh" 
            >
                <div>No articles to display.</div>
            </Box>
        );
    }

    return (
        <>
            <ButtonAppBar/>
            <Box>
                <Hidden only="xs">
                    <Box
                        position="fixed" 
                        marginTop={10}
                        zIndex={1000} 
                    >
                        <ToggleButtonGroup
                            orientation="vertical"
                            value={viewMode}
                            exclusive
                            onChange={toggleViewMode}
                            aria-label="View mode"
                        >
                            <ToggleButton value="grid" aria-label="Grid view">
                                <ViewModuleIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Hidden>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="stretch"
                    marginTop={7}
                    sx={{
                        '@media (max-width: 600px)': {
                            marginTop: 7,
                        },
                    }}
                >
                    {news.articles.map((item, index) => (
                        <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 4} key={index}>
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <Card
                                    sx={{
                                        xs: '100%',
                                        maxWidth: '100%',
                                        height: '100%',
                                        marginLeft: viewMode === 'list' ? 5 : 7, 
                                        '@media (max-width: 600px)': {
                                            marginLeft: 0,
                                        },
                                    }}
                                >
                                    {/* Conditionally render CardMedia */}
                                    {item.urlToImage ? (
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={item.urlToImage}
                                            title={item.title}
                                        />
                                    ) : (
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={NewsLogo}
                                            title={item.title}
                                        />
                                    )}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        {viewMode === 'grid' && (
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        )}
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => handleMoreClick(index)}
                                        >
                                            More...
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {clickedCardId !== null && (
                <SingleCardView
                    newsItem={news.articles[clickedCardId]} 
                    onClose={() => setClickedCardId(null)}
                />
            )}
        </>
    );
};

export default NewsCard;
