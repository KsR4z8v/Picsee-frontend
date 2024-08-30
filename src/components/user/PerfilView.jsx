import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import "./perfilview.css";
import PhotosView from "../photos/PhotosView";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

export default function PerfilView() {
  const { avatar, username } = useContext(UserContext);
  const [fullnameView, setFullnameView] = useState();
  const [usernameView, setUsernameView] = useState();
  const [p, setP] = useState("icon-active");
  const [l, setL] = useState("");

  useEffect(() => {
    console.count();
    setFullnameView(username);
    setUsernameView(username);
  }, [username]);

  return (
    <div className="block-perfil">
      <div className="block-perfil__container-info-user">
        <img src={avatar} className="block-perfil__avatar" alt="" />
        <div className="block-perfil__container-data">
          <div className="block-perfil__top-data">
            <p className="block-perfil__fullname">{fullnameView}</p>
            <div className="block-perfil__options">
              <div className="block-perfil__btn-edit-perfil btn-option ">
                Editar perfil
              </div>
              <div className="block-perfil__btn-more btn-option btn-more">
                ...
              </div>
            </div>
          </div>

          <p className="block-perfil__username">{`@${usernameView}`}</p>
        </div>
      </div>

      <div className="block-perfil__options-feed">
        <div className="block-perfil__container-icon-photo">
          <MdPhotoSizeSelectActual
            onClick={() => {
              setP("icon-active");
              setL("");
            }}
            size={25}
            className={`block-perfil__icon-photo icon-option-feed ${p}`}
          />
        </div>

        <div
          onClick={() => {
            setL("icon-active");
            setP("");
          }}
          className={`block-perfil__container-icon-heart `}
        >
          <FaHeart
            className={`block-perfil__icon-heart icon-heart  icon-option-feed ${l}`}
            size={25}
          />
          <p className="likes"> liked {103}</p>
        </div>
      </div>
      <div className="block-perfil__photos-feed">
        <PhotosView user={username} />
      </div>
    </div>
  );
}
