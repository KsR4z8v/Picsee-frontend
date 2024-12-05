import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";

function Signup() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [firstNames, setFirstNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const { create } = useUser();

  const registerHandler = () => {
    setErrorMessage("");
    if (
      [lastNames, firstNames, email, username, password1, password2].some(
        (d) => d.trim() === ""
      )
    ) {
      return setErrorMessage("Por favor, rellene los campos obligatorios");
    }
    if (password1 !== password2) {
      return setErrorMessage("Las contraseñas no coinciden");
    }

    if (password1.length < 9) {
      return setErrorMessage("La contraseña debe tener al menos 9 caracteres");
    }
    setLoader(true);
    create(
      (data, err) => {
        setLoader(false);
        if (err) {
          return setErrorMessage(err);
        }
        window.sessionStorage.setItem("session", JSON.stringify(data.data));
        navigate(`/?${searchParams.toString()}`);
      },
      {
        username,
        lastNames,
        firstNames,
        email,
        password: password1,
      }
    );
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="container-form">
        <div className="header_signup">
          <div className="text">Registro</div>
          <div className="underline_signup"></div>
        </div>

        <div className="inputs">
          <input
            onChange={(e) => {
              setFirstNames(e.target.value);
            }}
            id="registro-nombres-input"
            className="input_signup input-form"
            type="text"
            placeholder="Nombres"
          />

          <input
            onChange={(e) => {
              setLastNames(e.target.value);
            }}
            id="registro-apellidos-input"
            className="input_signup input-form"
            type="text"
            placeholder="Apellidos"
          />

          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="registro-usuario-input"
            className="input_signup input-form"
            type="text"
            placeholder="Nombre de usuario"
            required
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="registro-correo-input"
            className="input_signup input-form"
            type="email"
            placeholder="ejemplo@correo.co"
            required
          />

          <input
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            id="registro-contraseña-input"
            className="input_signup input-form"
            type="password"
            placeholder="Contraseña mínimo 9 caracteres"
            required
          />
          <input
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            id="registro-contraseña-input-2"
            className="input_signup input-form"
            type="password"
            placeholder="Confirmar contraseña"
            required
          />

          <div id="container_error_signup">{errorMessage}</div>

          <div
            onClick={registerHandler}
            id="btn_registro"
            className="submit_signup"
          >
            {loader ? (
              <span className="loader form-loader"></span>
            ) : (
              "Registrar"
            )}
          </div>

          <div className="has-account">
            <p>
              ¿Ya tienes una cuenta?
              <NavLink className="nav-link" to="/forms/sign">
                <b>Inicia aquí</b>
              </NavLink>
            </p>
          </div>

          <div className="terminosCondiciones">
            Al unirte aceptas los términos y condiciones ®
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
