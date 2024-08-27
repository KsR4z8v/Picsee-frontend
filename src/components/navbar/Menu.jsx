import { useContext } from "react";
import "./menu.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
// eslint-disable-next-line react/prop-types
export default function Menu({ closeMenu }) {
  const navigate = useNavigate();
  const { username } = useContext(UserContext);
  return (
    <div className="nav-bar__block-menu block-menu">
      <ul className="block-menu__list">
        <li
          onClick={() => {
            closeMenu();
            navigate(`/perfil/${username}`);
          }}
          className="block-menu__item item-perfil"
        >
          Perfil
        </li>
        <hr />
        <li
          onClick={() => {
            window.sessionStorage.removeItem("session");
            window.location.reload();
          }}
          className="block-menu__item item-logout"
        >
          Cerrar sesion
        </li>
      </ul>
    </div>
  );
}
