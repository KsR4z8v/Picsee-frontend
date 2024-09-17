import { Outlet, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./forms.css";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";

function FormsView() {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate  =  useNavigate()
  const images = [
    {
      url: "https://wallpapercave.com/wp/wp3207026.jpg",
      username: "oscar",
      avatar: "https://wallpapercave.com/wp/wp3207026.jpg",
    },
    {
      url: "https://images.alphacoders.com/565/565448.jpg",
      username: "oscar",
      avatar: "https://wallpapercave.com/wp/wp3207026.jpg",
    },
    {
      url: "https://images.hdqwalls.com/download/beautiful-landscape-nature-scenery-1d-2560x1440.jpg",
      username: "oscar",
      avatar: "https://wallpapercave.com/wp/wp3207026.jpg",
    },
    {
      url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fstarfield-2023_bmVsaWeUmZqaraWkpJRmbmdlrWZlbWU.jpg&f=1&nofb=1&ipt=c611b1d2be19a16172f1611c550bbfee8c4040cb5d251830fffa64227b7c264f&ipo=images",
      username: "oscar",
      avatar: "https://wallpapercave.com/wp/wp3207026.jpg",
    },
    {
      url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2FllgBZW0.jpg&f=1&nofb=1&ipt=215e90cd8a89a479f57ac40c94aab066e6addc70ec842bbb40d0b2245cf19c4b&ipo=images",
      username: "oscar",
      avatar: "https://wallpapercave.com/wp/wp3207026.jpg",
    },
  ];
  useEffect(() => {
    const id = setInterval(() => {
      if (currentImage < images.length - 1) {
        setCurrentImage(currentImage + 1);
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [currentImage]);

  return (
    <>
      <GoogleOAuthProvider clientId="126393557652-10jkor8qq6s4h196vtbktkco4j343vdu.apps.googleusercontent.com">
        <div className="container-forms">
           <GoArrowLeft onClick={()=>{
            navigate('/')
           }} size={30} className="icon-back"/>   
          <Outlet  />
          <div className="container-photo">
            <img className="user-photo" src={images[currentImage].url} alt="" />
            <img
              className="user-avatar"
              src={images[currentImage].avatar}
              alt=""
            />
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default FormsView;
