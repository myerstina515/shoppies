import React, { useState, useEffect } from 'react';
import './Main.scss';
import { makeStyles, fade, Card, Typography, CardMedia, Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Main = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getMovies = async (search) => {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=f87015ef`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }
  const handleClick = (chosenMovie) => {
    if (favorites.length < 5) {
      let favoritesList = [...favorites, chosenMovie]
      setFavorites(favoritesList);
      // saveToLocalStorage(favoritesList);
    }
  }
  const handleRemove = (favoriteOne) => {
    const newFavoritesList = favorites.filter(
      (favorite) => favorite.imdbID !== favoriteOne.imdbID
    );

    setFavorites(newFavoritesList);
    // saveToLocalStorage(newFavoritesList);
    console.log(favorites);
  };

  useEffect(() => {
    getMovies(search);
  }, [search]);

  // useEffect(() => {
  //   const movieFavorites = JSON.parse(
  //     localStorage.getItem('react-movie-app-Favorites')
  //   );
  //   setFavorites(movieFavorites);
  // }, []);

  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem('react-movie-app-Favorites', JSON.stringify(items));
  // };

  // console.log(favorites);
  // let favoritesArray = Array.isArray(favorites);
  // console.log(Array.isArray(favorites));
  // console.log(Array.isArray(movies));
  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Type to search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>

      { (movies.length === 0) ? 
      <div>
        <h1>Welcome to the Shoppies!</h1>
        <p>Nominate your favorite movies, and they could win the Shoppie Award!</p>
        <p>To get started, search for the title of your favorite movie above!</p>
        <p><em>A maximum of 5 movies can be nominated</em></p>
      </div>
      :
      <div class='container'>
        { (movies.length > 0) ?
        <div id="labels">Movies
          <div id='moviesList'>
            {movies.map((chosenMovie, idx) => (
              <Card id='movieImage' key={idx}>
                <CardMedia
                  component="img"
                  id='poster'
                  height='600'
                  image={chosenMovie.Poster}
                  alt="movie" />
                <Typography>{chosenMovie.Title}({chosenMovie.Year})</Typography>
                <Button id="button" size="small" color="dark" onClick={(() => handleClick(chosenMovie))}>
                  Add to Favorites</Button>
              </Card>

            ))}
          </div>
        </div>
        : <div></div>
        }
        {(favorites.length > 0) ?
          <div id="labels">Favorites
            <div id='favoritesList'>

              {favorites.map((favoriteOne, idx) => (
                <Card id='favoriteImage' key={idx}>
                  <CardMedia
                    component="img"
                    id="poster"
                    height="600"
                    image={favoriteOne.Poster}
                    alt="favorites" />
                  <Button id="button" size="small" color="dark" onClick={(() => handleRemove(favoriteOne))}>Remove</Button>
                </Card>
              ))}
            </div>
          </div>
          : <div></div>
        }
      </div>

      }
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.50),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))
export default Main;