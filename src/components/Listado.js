//library
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

export default function Listado(props) {
  let token = sessionStorage.getItem("token");

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endpoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=a2325b4b2b70239309b69bbc7b115d18&language=es-ESpage=1";
    axios
      .get(endpoint)
      .then((response) => {
        const apiData = response.data;
        setMoviesList(apiData.results);
      })
      .catch((error) => swAlert(<h2>Hubo errores, intenta más tarde</h2>));
  }, [setMoviesList]);

  /* const onClick = (e) => {
    const heart = e.target.innerHTML;

    if (heart === "🖤") {
      e.target.innerHTML = "❤️";
    } else {
      e.target.innerHTML = "🖤";
    }
  }; */

  return (
    <>
      {!token && <Redirect to="/" />}

      <div className="row">
        {moviesList.map((oneMovie, idx) => {
          return (
            <div className="col-sm-5 col-md-4 col-lg-3  " key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="movie poster"
                />
                <button
                  className="favourite-btn"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  🖤
                </button>
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
