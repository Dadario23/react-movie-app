import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import swAlert from "@sweetalert/with-react";

import { useLocation } from "react-router-dom";

export default function Detalle() {
  let token = sessionStorage.getItem("token");
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    /* console.log(movieID); */
    const endpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=a2325b4b2b70239309b69bbc7b115d18&language=es-ES`;

    axios
      .get(endpoint)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) => swAlert(<h2>Hubo errores, intenta más tarde</h2>));
  }, [movieID]);

  return (
    <>
      {!token && <Redirect to="/" />}
      {!movie && <p>Cargando...</p>}
      {movie && (
        <>
          <h2>Título: {movie.title}</h2>
          <div className="row">
            <div className="col-sm-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="img-fluid"
                alt="movie poster"
              />
            </div>
            <div className="col-8">
              <h5>Fecha de estreno: {movie.release_date}</h5>
              <h5>Reseña:</h5>
              <p>{movie.overview}</p>
              <h5>Rating: {movie.vote_average}</h5>
              <h5>Géneros:</h5>
              <ul>
                {movie.genres.map((oneGenre) => (
                  <li key={oneGenre.id}>{oneGenre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
