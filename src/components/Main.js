import React, { useReducer, useEffect } from "react";
import Joke from "./Joke";

const Main = () => {
  const reducer = (data, update) => {
    return {
      ...data,
      ...update,
    };
  };

  const [data, dispatch] = useReducer(reducer, { active: "random" });

  useEffect(() => {
    fetch(`https://api.chucknorris.io/jokes/categories`)
      .then((response) => response.json())
      .then((categories) => dispatch({ categories }));
  }, []);

  const selectRadio = (e) => dispatch({ active: e.target.value });

  const selectCategory = (e) =>
    dispatch({ category: e.target.getAttribute("data-category") });

  const handleSearch = (e) => dispatch({ searchVal: e.target.value });

  const searchByCategory = (category) => {
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => response.json())
      .then((joke) => dispatch({ joke }));
  };

  const searchByRequest = (request) => {
    fetch(`https://api.chucknorris.io/jokes/search?query=${request}`)
      .then((response) => response.json())
      .then((joke) => {
        console.log(joke);
        dispatch({
          joke: joke.result[Math.floor(Math.random() * joke.result.length - 1)],
          searchVal: "",
        });
      });
  };

  const getRandomJoke = () => {
    fetch(`https://api.chucknorris.io/jokes/random`)
      .then((response) => response.json())
      .then((joke) => dispatch({ joke }));
  };

  const getJoke = () => {
    const { active, category, searchVal } = data;

    return active === "search" && searchVal
      ? searchByRequest(searchVal)
      : active === "category"
      ? searchByCategory(category)
      : getRandomJoke();
  };

  return (
    <div className="main column">
      <h1>Chuck Norris</h1>
      <h3>Let s try to find a joke for you</h3>
      <div className="column">
        <div className="input-wrapper row">
          <input
            type="radio"
            value="random"
            onChange={selectRadio}
            checked={data.active === "random"}
          />
          <span>Random</span>
        </div>
        <div className="input-wrapper row">
          <input
            type="radio"
            value="category"
            onChange={selectRadio}
            checked={data.active === "category"}
          />
          <span>From categories</span>
        </div>
        {data.active === "category" && data.categories && (
          <div className="category-wrapper row">
            {data.categories.map((item, index) => (
              <button
                key={index}
                className={`category row centered ${
                  data.category === item && "active"
                }`}
                data-category={item}
                onClick={selectCategory}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        <div className="input-wrapper row">
          <input
            type="radio"
            value="search"
            onChange={selectRadio}
            checked={data.active === "search"}
          />
          <span>Search</span>
        </div>
        {data.active === "search" && (
          <input
            type="text"
            id="search"
            onChange={handleSearch}
            value={data.searchVal || ""}
          />
        )}
      </div>
      <button onClick={getJoke}>Get joke</button>
      {data.joke && <Joke joke={data.joke} />}
    </div>
  );
};

export default Main;
