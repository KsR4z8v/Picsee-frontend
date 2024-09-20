import { useEffect } from "react";
import PhotosView from "../photos/PhotosView";
import TagsView from "../tags/TagsView";
import { useSearchParams } from "react-router-dom";

function MainView() {
  const [searchParams] = useSearchParams();

  useEffect(() => {}, []);

  return (
    <>
      <div className="container-main">
        <TagsView />
        <PhotosView
          tag={searchParams.get("tag")}
          query={searchParams.get("query")}
        />
      </div>
    </>
  );
}

export default MainView;
