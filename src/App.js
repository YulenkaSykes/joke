import { useEffect, useState, createContext } from "react";

import Main from "./components/Main";
import LikeList from "./components/LikeList";
import "./App.css";

const App = () => {
  const [likeList, setLikeList] = useState([]);
  const [showFv, setShowFv] = useState(!window.innerWidth < 800);
  const [theme, setTheme] = useState({
    color: "black",
    background: "white",
  });

  const addToLikeList = (joke) => {
    setLikeList([...likeList, joke]);
  };

  const removeFromLikeList = (joke) => {
    setLikeList(likeList.filter((item) => item.id !== joke.id));
  };

  const findInLikeList = (joke) => {
    return likeList.find((item) => item.id === joke.id);
  };

  const onResize = () => setShowFv(window.innerWidth > 1024);

  useEffect(() => {
    localStorage.getItem("likeList") &&
      setLikeList(JSON.parse(localStorage.getItem("likeList")));

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  return (
    <div className="app row" style={theme}>
      <img
        className="show-fv"
        onClick={() => setShowFv(!showFv)}
        src={showFv ? "/close.png" : "/menu.png"}
        alt="action"
      />

      <likeListOperations.Provider
        value={{ addToLikeList, removeFromLikeList, findInLikeList }}
      >
        <div className="main-wrapper column">
          <Main />
          <div className="theme-wrapper row centered">
            <div
              className="round-theme"
              onClick={() => setTheme({ color: "black", background: "white" })}
              style={{ background: "white" }}
            ></div>
            <div
              className="round-theme"
              onClick={() =>
                setTheme({
                  color: "white",
                  background: "linear-gradient(40deg, purple, blue)",
                })
              }
              style={{
                background: "linear-gradient(40deg, purple, blue)",
              }}
            ></div>
            <div
              className="round-theme"
              onClick={() =>
                setTheme({ color: "white", background: "rgb(20,20,20)" })
              }
              style={{ background: "#333333" }}
            ></div>
          </div>
        </div>
        {showFv && <LikeList list={likeList} />}
      </likeListOperations.Provider>
    </div>
  );
};

export const likeListOperations = createContext();

export default App;
