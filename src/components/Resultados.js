import { useEffect, useState } from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { Link } from "react-router-dom";

export default function Resultados() {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=a2325b4b2b70239309b69bbc7b115d18&language=es-US&query=${keyword}`;

    axios
      .get(endpoint)
      .then((response) => {
        const moviesArray = response.data.results;
        if (moviesArray.length === 0) {
          swAlert(<h4>Tu búsqueda no arrojó resultados</h4>);
        }
        setMoviesResults(moviesArray);
      })
      .catch((error) => swAlert(<h2>Hubo errores, intenta más tarde</h2>));
  }, [keyword]);

  return (
    <>
      <h2>
        Buscaste: <em>{keyword}</em>
      </h2>
      {moviesResults.length === 0 && <h3>No hay resultados</h3>}
      <div className="row">
        {moviesResults.map((oneMovie, idx) => {
          return (
            <div className="col-4" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="movie poster"
                />
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 120)}...
                  </p>
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    Ver mas ...
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
