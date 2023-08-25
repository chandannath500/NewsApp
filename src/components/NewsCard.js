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
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Hidden } from '@mui/material';
import SingleCardView from './SingleCardView';
import NewsLogo from '../asset/news-logo.png';
import ButtonAppBar from './AppBar';

const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const NewsCard = () => {
  const { news, loading, error } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('grid');
  const [clickedCardId, setClickedCardId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const [sortingAscending, setSortingAscending] = useState(true);

  useEffect(() => {
    dispatch(getNews());
  }, []);

  useEffect(() => {
    if (news && news.articles) {
      setFilteredNews(news.articles);
    }
  }, [news]);

  const handleMoreClick = (id) => {
    setClickedCardId(id);
  };

  const toggleViewMode = (event, newViewMode) => {
    setViewMode(newViewMode);
  };

 const handleSearch = debounce((query) => {
  setSearchQuery(query);

  if (query.trim() === '') {
    const sortedArticles = sortingAscending
      ? [...news.articles].sort((a, b) => a.title.localeCompare(b.title))
      : [...news.articles].sort((a, b) => b.title.localeCompare(a.title));
    setFilteredNews(sortedArticles);
    return;
  }

  const filteredArticles = news.articles.filter((article) => {
    const titleWords = article.title.toLowerCase().split(' ');
    const queryWords = query.toLowerCase().split(' ');
    
    return queryWords.every((queryWord) =>
      titleWords.some((titleWord) => titleWord === queryWord)
    );
  });

  setFilteredNews(filteredArticles);
}, 4000);
  

  const handleSort = (ascending) => {
    const sortedArticles = [...filteredNews].sort((a, b) => {
      if (ascending) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setFilteredNews(sortedArticles);
    setSortingAscending(ascending);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    handleSearch(query);
  };

  if (loading) {
    return (
      <>
        <ButtonAppBar onSearch={handleSearch} onSort={handleSort} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <div>Loading...</div>
        </Box>
      </>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <ButtonAppBar onSearch={handleSearch} onSort={handleSort} />
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
        <div style={{ margin: '20px' }}>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
            }}
          />
        </div>
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
          {filteredNews.map((item, index) => (
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
