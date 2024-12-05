import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const RecoverPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { recoverPasswordLink } = useUser();

  const handleRecovery = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError(true);
      return setMessage("Debes de ingresar un correo electronico");
    }
    setLoader(true);
    recoverPasswordLink((data, error) => {
      setLoader(false);
      if (error) {
        setError(true);
        return setMessage(error);
      }
      setError(false);
      setMessage(`Se envió el enlace para recuperar la contraseña a ${email}`);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }, email);
  };

  useEffect(() => {}, []);

  return (
    <div className="container-form">
      <div className="header-form">
        <h2 className="text">Recuperar Contraseña</h2>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="registro-correo-input"
          className="input_signup input-form"
          type="email"
          placeholder="ejemplo@correo.co"
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRecovery(e);
          }}
        />
        {message && (
          <div
            className="container-info"
            style={{ color: error ? "red" : "#000000" }}
          >
            {message}
          </div>
        )}

        <div className="submit-container">
          <div className="submit" onClick={handleRecovery}>
            {loader ? <span className="loader form-loader"></span> : "Enviar"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPass;
