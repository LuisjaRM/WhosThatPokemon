import { useEffect, useState } from "react";
import "./Pokemon.css";
import { Counter } from "../Counter/Counter";

export const Pokemon = () => {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomNumber = getRandomInt(1, 150);

  const [id, setId] = useState(randomNumber);
  const [info, setInfo] = useState();
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setInfo(data);
      setAnswer("");
      setShow(false);
      setIsDisabled(false);
    };
    loadData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShow(!show);
    setAnswer(event.target.elements.search.value);
    event.target.elements.search.value = "";
    setIsDisabled(true);
  };

  return (
    info && (
      <section className="pokemon-card">
        <h2 className="title">Who's that pokemon?</h2>

        <article className="pokemon-link">
          <img
            src={info.sprites.front_default}
            alt={info.name}
            className={`pokemon-image ${show ? "show" : "hide"}`}
          />
        </article>

        <p className={`pokemon-name ${show ? "show" : "hide"}`}>
          It's {info.name}!
        </p>

        <button
          onClick={() => setId(getRandomInt(1, 150))}
          className="next-button"
        >
          NEXT
        </button>

        <form onSubmit={handleSubmit}>
          <label>
            {isDisabled ? (
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Write a pokemon..."
                className="answer"
                disabled
              />
            ) : (
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Write a pokemon..."
                className="answer"
              />
            )}

            <button className="button-send">Send</button>
          </label>
        </form>

        <Counter pokemon={info.name} answer={answer} />
      </section>
    )
  );
};
