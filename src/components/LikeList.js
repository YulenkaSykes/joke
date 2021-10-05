import React, { useState } from "react";
import Joke from "./Joke";

const LikeList = ({ list }) => {
  const [val, setVal] = useState();

  return (
    <div className="likelist column">
      <h4>Favourite:</h4>
      <input type="text" onChange={(e) => setVal(e.target.value)} />
      {list.length < 1 ? (
        <h5>Nothing here yet</h5>
      ) : val ? (
        list
          .filter((item) => item.value.includes(val))
          .map((item, index) => <Joke key={index} joke={item} />)
      ) : (
        list.map((item, index) => <Joke key={index} joke={item} />)
      )}
    </div>
  );
};

export default LikeList;
