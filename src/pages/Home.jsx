import NavBar from "../components/navbar/NavBar";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import UploadPhotos from "../components/photos/UploadPhotosModal";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";

function Home() {
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { logged } = useContext(UserContext);
  const navigate = useNavigate();

  const openUploadModal = () => {
    if (!logged) {
      navigate("/forms/sign?o=u");
    } else {
      setVisibleUploadModal(true);
    }
  };
  useEffect(() => {
    const session = window.sessionStorage.getItem("session");
    if (session && searchParams.get("o") === "u") {
      searchParams.delete("o");
      setVisibleUploadModal(true);
    }
  }, []);
  return (
    <>
      <div>
        <NavBar openUploadModal={openUploadModal} />
        {visibleUploadModal ? (
          <UploadPhotos visibleModel={setVisibleUploadModal} />
        ) : (
          <></>
        )}
        <Outlet />
      </div>
    </>
  );
}
export default Home;
