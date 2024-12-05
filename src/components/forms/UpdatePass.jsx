import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function UpdatePass() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const { resetPassword } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = () => {
    if (newPassword != confirmPassword) {
      return setMessage("Las contraseñas no coinciden");
    }
    if (newPassword.length < 9) {
      return setMessage("La contraseña debe tener al menos 9 caracteres");
    }
    setLoader(true);

    resetPassword(
      (data, err) => {
        setLoader(false);
        if (err) {
          return setMessage(
            "Ups. tuvimos problemas para actualizar tu contraseña, intenta nuevamete"
          );
        }
        navigate("/forms/sign");
      },
      newPassword,
      searchParams.get("t")
    );
  };

  useEffect(() => {
    // if (!searchParams.get("t")) {
    //   navigate("/");
    // }
  }, []);

  return (
    <div className="container-form">
      <div className="header-form">
        <div className="text">Actualizar Contraseña</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <input
            id="login-password-input"
            onChange={(event) => setPassword(event.target.value)}
            className="form_sign__input-password input-form"
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <div className="input">
          <input
            id="login-password-input"
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="form_sign__input-password input-form"
            type="password"
            placeholder="Contraseña"
          />
        </div>
        {message && (
          <div id="container_error" className="form-sign__container-error">
            {message}
          </div>
        )}
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            {loader ? (
              <span className="loader form-loader"></span>
            ) : (
              "Actualizar"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
