import { useEffect, useState } from "react";
import "./Codeinput.css";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function UpdatePass() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { updatePassword } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectToInit = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    updatePassword(
      (data, err) => {
        if (err) {
          setMessage(
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
    if (!searchParams.get("t")) {
      redirectToInit();
    }
  }, []);

  return (
    <div className="CodeInput">
      <h2>Recuperacion</h2>
      <div>
        <div className="inputs_code">
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <input
            type="password"
            id="newPassword"
            className="input-form_code"
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="newPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            className="input-form_code"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="submit-container_code">
          <div className="submit_code" onClick={handleSubmit}>
            Cambiar Contraseña
          </div>
          {message && <p id="container_error_code">{message}</p>}
        </div>
      </div>
    </div>
  );
}
