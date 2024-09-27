import { useState } from "react";
import useUser from "../../hooks/useUser";
import "./recoverpass.css";

const RecoverPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { recoverPassword } = useUser();

  const handleRecovery = (e) => {
    e.preventDefault();
    recoverPassword((data, error) => {
      if (error) {
        return setMessage(error);
      }
      setMessage(`Se envió el enlace para recuperar la contraseña a ${email}`);
    }, email);
  };

  return (
    <div className="Recover_password">
      <div className="header_recover">
        <h2 className="text_recover">Recuperar Contraseña</h2>
        <div className="underline_recover"></div>
      </div>
      <div className="inputs_recover">
        <input
          type="email"
          id="email"
          className="input-form_recover"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
          required
        />
        {message && <p>{message}</p>}
        <div className="submit-container_recover">
          <div onClick={handleRecovery} className="submit_recover">
            Enviar
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default RecoverPass;
