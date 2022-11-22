import swAlert from "@sweetalert/with-react";
import { useHistory, Redirect } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || password === "") {
      swAlert(<h2>los campos no pueden estar vacios</h2>);
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      swAlert(<h2>Debes escribir una direccion de correo valida</h2>);
      return;
    }

    if (email !== "admin@admin.com" || password !== "admin") {
      swAlert(<h2>Credenciales inválidas</h2>);
      return;
    }
    swAlert(<h2>Ingresaste Correctamente</h2>);

    //Creacion de la simulación del TOKEN
    function random() {
      return Math.random().toString(36).substr(2); // Eliminar `0.`
    }

    function tokenLocal() {
      return random() + random() + random();
    }
    const token = tokenLocal();
    token.toString();
    sessionStorage.setItem("token", token);
    history.push("/listado");
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Redirect to="/listado" />}
      <div className="row">
        <div className="col-6 offset-3">
          <h2>Formulario de Login</h2>
          <form onSubmit={submitHandler}>
            <label className="form-label d-bock mt-2">
              <span>Correo Electrónico:</span> <br />
              <input className="form-control" type="text" name="email" />
            </label>
            <label className="form-label d-bock mt-2">
              <span>Contraseña:</span> <br />
              <input className="form-control" type="password" name="password" />
            </label>

            <br />
            <button className="btn btn-success mt-2" type="submit">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
