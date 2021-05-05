import React, { useState, useEffect } from 'react';

const Main = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getMovies = async (search) => {
    const url = `http://www.omdbapi.com/?s=${search}&apikey=f87015ef`;
    console.log(search);
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
      console.log(responseJson.Search);
    }
  }
  const handleClick = (chosenMovie) => {
    // if (favorites.length === 0) {
    // } else
    if (favorites.length < 5) {
      let favoritesList = [...favorites, chosenMovie]
      setFavorites(favoritesList);
      //   console.log(chosenMovie);
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
    <>
      <div>
        <input
          onChange={(event) => setSearch(event.target.value)}
          placeholder='Type to search...'
        ></input>
      </div>
      <div>
        <p>Movies</p>
        {movies.map((chosenMovie, idx) => (
          <div key={idx}>
            <img src={chosenMovie.Poster} alt="movie">
            </img>
            <button onClick={(() => handleClick(chosenMovie))}>
              Add to Favorites
            </button>
          </div>

        ))}
      </div>
      <div>
        <h3>Favorites</h3>
        {favorites.map((favoriteOne, idx) => (
          <div key={idx}>
            <img src={favoriteOne.Poster} alt="favorites"></img>
            <button onClick={(() => handleRemove(favoriteOne))}>Remove</button>
          </div>
        ))}

      </div>
    </>
  )
}
export default Main;