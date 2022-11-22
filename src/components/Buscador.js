import swAlert from "@sweetalert/with-react";
import { useHistory } from "react-router-dom";

export default function Buscador() {
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      swAlert(<h5>Tienes que escribir una película</h5>);
    } else if (keyword.length < 4) {
      swAlert(<h5>Tienes que escribir mas de 4 caracteres</h5>);
    } else {
      e.currentTarget.keyword.value = "";
      history.push(`/resultados?keyword=${keyword}`);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className="d-flex align-items-center">
        <label className="form-label mb-0 mx-2">
          <input
            className="form-control"
            type="text"
            name="keyword"
            placeholder="Buscar película ..."
          />
        </label>

        <button className="btn btn-success" type="submit">
          Buscar
        </button>
      </form>
    </>
  );
}
