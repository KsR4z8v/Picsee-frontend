import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import UserContext from "../../context/userContext";

function Signup() {
  const { redirect } = useParams();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [firstNames, setFirstNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { setLogged } = useContext(UserContext);
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
    setLoader(true);
    create(
      (data, err) => {
        setLoader(false);
        if (err) {
          return setErrorMessage(err);
        }
        if (redirect) {
          navigate(`/${redirect}`);
        } else {
          navigate("/");
        }
        setLogged(true);
        window.sessionStorage.setItem("session", JSON.stringify(data.data));
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
      <div className="container_signup">
        <div className="header_signup">
          <div className="text_signup">Registro</div>
          <div className="underline_signup"></div>
        </div>

        <div className="inputs_signup">
          <input
            onChange={(e) => {
              setFirstNames(e.target.value);
            }}
            id="registro-nombres-input"
            className="input_signup"
            type="text"
            placeholder="Nombre *"
          />

          <input
            onChange={(e) => {
              setLastNames(e.target.value);
            }}
            id="registro-apellidos-input"
            className="input_signup"
            type="text"
            placeholder="Apellidos *"
          />

          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="registro-usuario-input"
            className="input_signup"
            type="text"
            placeholder="Nombre de usuario *"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="registro-correo-input"
            className="input_signup"
            type="email"
            placeholder="ejemplo@correo.co *"
          />

          <input
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            id="registro-contraseña-input"
            className="input_signup"
            type="password"
            placeholder="Contraseña mínimo 8 caracteres *"
          />
          <input
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            id="registro-contraseña-input-2"
            className="input_signup"
            type="password"
            placeholder="Confirmar contraseña *"
          />

          {loader ? (
            <div className="effect-loader">
              <svg className="ring" viewBox="25 25 50 50" stroke-width="5">
                <circle cx="50" cy="50" r="20" />
              </svg>
            </div>
          ) : (
            <></>
          )}
          <div id="container_error_signup">{errorMessage}</div>

          <div
            onClick={registerHandler}
            id="btn_registro"
            className="submit_signup"
          >
            Registrarse
          </div>

          <div className="siTieneCuenta">
            <p>
              ¿Ya tienes una cuenta?
              <NavLink className="nav-link" to="/forms/sign">
                {" "}
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
