import React, { useState } from "react";

export default function MovieSearcher() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=bee95c0ce65455ace48bb547e3d98286&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="Search Movie"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search"
          />
          <button type="submit" className="submit-button">
            Search
          </button>
        </form>
      </div>

      <div className="movie-cards">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + " poster"}
                width="150px"
                style={{ borderRadius: "5px" }}
                className="movie-pic"
              />
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-desc">{movie.overview}</p>
              <p className="movie-date">
                <small>RELEASE DATE: {movie.release_date}</small>
              </p>
              <p className="movie-rating">RATING: {movie.vote_average}</p>
            </div>
          ))}
      </div>
    </>
  );
}
