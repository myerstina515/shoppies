import React, { useState, useEffect } from 'react';
import './Main.scss';
import { makeStyles, fade, Card, Typography, CardMedia, Button, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Camera from '../assets/camera.png';


const Main = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [nominates, setnominates] = useState([]);
  const [disable, setDisable] = useState(false);

  const getMovies = async (search) => {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=f87015ef`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }
  const handleClick = (chosenMovie) => {
    console.log(chosenMovie)
    if (nominates.length === 4) {
      setDisable(true);
      let nominatesList = [...nominates, chosenMovie];
      setnominates(nominatesList);
    }
    else if (nominates.length < 5) {
      let nominatesList = [...nominates, chosenMovie];
      setnominates(nominatesList);

      // saveToLocalStorage(nominatesList);
    } 
    
  }
  const handleRemove = (nominateOne) => {
    const newnominatesList = nominates.filter(
      (nominate) => nominate.imdbID !== nominateOne.imdbID
    );

    setnominates(newnominatesList);
    // saveToLocalStorage(newnominatesList);
    setDisable(false);
    console.log(nominates);
  };

  useEffect(() => {
    getMovies(search);
  }, [search]);

  // useEffect(() => {
  //   const movienominates = JSON.parse(
  //     localStorage.getItem('react-movie-app-nominates')
  //   );
  //   setnominates(movienominates);
  // }, []);

  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem('react-movie-app-nominates', JSON.stringify(items));
  // };

  // console.log(nominates);
  // let nominatesArray = Array.isArray(nominates);
  // console.log(Array.isArray(nominates));
  // console.log(Array.isArray(movies));


  //TODO: clear search
  //TODO: disable "add" button once added to nominations (if movie.ID === imdb.ID, have button be disabled)
  //TODO: show banner when nominations.length === 5
  //TODO: Results for... search info
  //TODO: Local storage

  return (
    <div id="main">
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
        <Card id="welcomeCard">
          <h1>Welcome to the Shoppies!</h1>
          <p>Nominate your favorite movies, and they could win the Shoppie Award!</p>
          <p>To get started, search for the title of the movie you want to nominate above!</p>
          <p><em>A maximum of 5 movies can be nominated</em></p>
        </Card>
        :
        <div class='container'>
          {(movies.length > 0) ?
            <div id="labels">Movies
          <div id='moviesList'>
                {movies.map((chosenMovie, idx) => (
                  <Card id='movieImage' key={idx}>
                    { (chosenMovie.Poster === 'N/A') ?
                      <CardMedia
                        component="img"
                        id='poster'
                        height='600'
                        image={Camera}
                        alt="movie" />
                      :
                      <CardMedia
                        component="img"
                        id='poster'
                        height='600'
                        image={chosenMovie.Poster}
                        alt="movie" />
                    }
                    <Typography id="title">{chosenMovie.Title}({chosenMovie.Year})</Typography>
                    <Button id="button" disabled={disable} size="small" color="primary" onClick={(() => handleClick(chosenMovie))}>
                      Nominate</Button>
                  </Card>

                ))}
              </div>
            </div>
            : <div></div>
          }
          {(nominates.length > 0) ?
            <div id="labels">Nominations
            <div id='nominatesList'>

                {nominates.map((nominateOne, idx) => (
                  <Card id='nominateImage' key={idx}>
                    { (nominateOne.Poster === 'N/A') ?
                      <CardMedia
                        component="img"
                        id='poster'
                        height='600'
                        image={Camera}
                        alt="movie" />
                      :
                      <CardMedia
                        component="img"
                        id='poster'
                        height='600'
                        image={nominateOne.Poster}
                        alt="movie" />
                    }

                    <Typography id="title">{nominateOne.Title}({nominateOne.Year})</Typography>
                    <Button id="button" size="small" color="primary" onClick={(() => handleRemove(nominateOne))}>Remove</Button>
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
    width: '80%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))
export default Main;