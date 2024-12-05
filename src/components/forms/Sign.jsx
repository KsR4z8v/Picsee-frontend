import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./forms.css";

function Sign() {
  const [user, setUser] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { sign } = useUser();

  const signHandler = () => {
    setErrorMessage("");
    if (user.trim() === "" || password.trim() === "") {
      return setErrorMessage("Asegúrate de llenar todos los campos");
    }
    setLoader(true);
    sign(
      (data, err) => {
        setLoader(false); // Detener el cargador cuando se recibe respuesta
        if (err) {
          return setErrorMessage(err);
        }

        window.sessionStorage.setItem("session", JSON.stringify(data.data));
        navigate(`/?${searchParams.toString()}`);
      },
      { user, password }
    );
  };

  const signGooglePlatform = (credentials) => {
    setErrorMessage("");
    setLoader(true);
    sign(
      (data, err) => {
        setLoader(false); // Detener el cargador cuando se recibe respuesta
        if (err) {
          return setErrorMessage(err);
        }

        window.sessionStorage.setItem("session", JSON.stringify(data.data));
        navigate("/");
      },
      credentials,
      true
    );
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className="container-form">
        <div className="header-form">
          <div className="text">Inicia sesión</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <input
              id="login-username-input"
              onChange={(event) => setUser(event.target.value)}
              className="form_sign__input-username input-form"
              type="text"
              placeholder="Usuario o email"
            />
          </div>

          <div className="input">
            <input
              id="login-password-input"
              onChange={(event) => setPassword(event.target.value)}
              className="form_sign__input-password input-form"
              type="password"
              placeholder="Contraseña"
              onKeyDown={(e) => {
                if (e.key === "Enter") signHandler();
              }}
            />
          </div>
          {/* Mensaje de error si hay un problema */}
          {errorMessage && (
            <div id="container_error" className="form-sign__container-error">
              {errorMessage}
            </div>
          )}

          <div className="forgot-password">
            <span
              onClick={() => navigate("/forms/recoverpass")}
              style={{ cursor: "pointer" }}
            >
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <div className="submit-container">
            <div className="submit" onClick={signHandler}>
              {loader ? (
                <span className="loader form-loader"></span>
              ) : (
                "Iniciar sesion"
              )}
            </div>

            <div className="submit" onClick={() => navigate("/forms/signup")}>
              <b>Regístrate aquí</b>
            </div>
          </div>

          {/* Botón de Google para iniciar sesión */}
          <div className="container__google-login">
            <GoogleLogin
              className="button-google"
              onSuccess={(response) => {
                signGooglePlatform(response);
              }}
              onError={() => {
                alert("Google login failed");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sign;
