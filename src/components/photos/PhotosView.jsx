/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import usePosts from "../../hooks/usePosts";
import Post from "./Post";
import sortPhotosInColumns from "../../utils/sortPhotosColumn";
import "./photosview.css";

function PhotosView({ query, tag, user }) {
  const [colum1, setColum1] = useState([]);
  const [colum2, setColum2] = useState([]);
  const [colum3, setColum3] = useState([]);
  const [loader, setLoader] = useState(false);

  const { get } = usePosts();
  useEffect(() => {
    setLoader(true);
    setColum1([]);
    setColum2([]);
    setColum3([]);
    get(
      (data, err) => {
        if (err) {
          return alert(err);
        }
        const sort = sortPhotosInColumns(data.data.posts);
        setColum1(sort[0]);
        setColum2(sort[1]);
        setColum3(sort[2]);
        setLoader(false);
      },
      { query, tag, user }
    );
  }, [tag, query, user]);

  const f = (p, i) => {
    return <Post key={i} post={p} />;
  };

  return (
    <>
      <div className="container-main__block-photos block-photos">
        <div className="block-photos__container-columns">
          <div className={`block-photos__column-1 column`}>{colum1.map(f)}</div>
          <div className={`block-photos__column-2 column`}>{colum2.map(f)}</div>
          <div className={`block-photos__column-3 column`}>{colum3.map(f)}</div>
        </div>
        {loader ? (
          <span className="loader photos-main-loader"></span>
        ) : (
          (() => {
            const sum = colum1.length + colum2.length + colum3.length;
            if (sum === 0) {
              return (
                <div className="container-main__info-box">
                  Parece que no hay imágenes . ¡Explora otros tags o prueba en
                  la barra de busqueda y encuentra algo genial!
                </div>
              );
            }
            return <></>;
          })()
        )}
      </div>
    </>
  );
}

export default PhotosView;
