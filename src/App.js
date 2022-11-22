//library
import { Switch, Route } from "react-router-dom";

//components
import Footer from "./components/Footer";
import Header from "./components/Header";
import Listado from "./components/Listado";
import Login from "./components/Login";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

//styles
import "./css/app.css";
import "./css/bootstrap.min.css";

function App() {
  const arrayMovies = [];

  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;

    const movieData = {
      title,
      imgURL,
      overview,
      id: btn.dataset.movieId,
    };

    if (arrayMovies.length === 0) {
      arrayMovies.push(movieData);
      e.target.innerHTML = "❤️";
      console.log("Película Agregada 1");
    } else {
      let isMovie = arrayMovies.find((movie) => movie.id === movieData.id);
      if (!isMovie) {
        arrayMovies.push(movieData);
        e.target.innerHTML = "❤️";
        console.log("Película Agregada 2");
      } else {
        let indice = arrayMovies.indexOf(isMovie);
        arrayMovies.splice(indice, 1);
        e.target.innerHTML = "🖤";
        console.log("Película eliminada");
      }
    }
    localStorage.setItem("favs", JSON.stringify(arrayMovies));

    /* if (heart === "🖤") {
      
    } else {
      
    } */

    /* console.log(arrayMovies); */
  };

  return (
    <>
      <Header />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route
            path="/listado"
            render={(props) => (
              <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} {...props} />
            )}
          />
          <Route path="/detalle" component={Detalle} />
          <Route
            path="/resultados"
            render={(props) => (
              <Resultados
                addOrRemoveFromFavs={addOrRemoveFromFavs}
                {...props}
              />
            )}
          />
          <Route
            path="/favoritos"
            render={(props) => (
              <Favoritos addOrRemoveFromFavs={addOrRemoveFromFavs} {...props} />
            )}
          />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
