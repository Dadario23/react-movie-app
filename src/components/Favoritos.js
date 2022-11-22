import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

export default function Favoritos() {
  const [favorites, setFavorites] = useState([]);
  let token = sessionStorage.getItem("token");

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");

    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);
  return (
    <>
      {!token && <Redirect to="/" />}
      <h2>Sección de Favoritos</h2>
      <div className="row">
        {favorites.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card my-4">
                <img
                  src={oneMovie.imgURL}
                  className="card-img-top"
                  alt="movie poster"
                />
                {/* <button
                  className="favourite-btn"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  🖤
                </button> */}
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
