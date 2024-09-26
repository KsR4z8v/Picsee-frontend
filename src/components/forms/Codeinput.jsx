import { useState } from "react";
import "./Codeinput.css";

const CodeInput = ({ onSubmit }) => {
    const [code, setCode] = useState("");
    const [newPassword, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logica para enviar el codigo y la nueva contraseña
        onSubmit(code, newPassword);
        setMensaje("Código y nueva contraseña enviados exitosamente");
    };

    return (
        <div className="CodeInput">
            <h2>Recuperacion</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputs_code">
                    <label htmlFor="code">Código</label>
                    <input
                        type="text"
                        id="code"
                        className="input-form_code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
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
                </div>
                <div className="submit-container_code">
                    <button type="submit" className="submit_code">Cambiar Contraseña</button>
                    {mensaje && <p id="container_error_code">{mensaje}</p>}
                </div>
            </form>
        </div>
    );
};

export default CodeInput;
