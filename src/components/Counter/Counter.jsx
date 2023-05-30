import { useEffect, useState } from "react";
import "./Counter.css";

export const Counter = ({ pokemon, answer }) => {
  const storedCorrects = JSON.parse(localStorage.getItem("corrects")) || 0;
  const storedErrors = JSON.parse(localStorage.getItem("errors")) || 0;

  const [corrects, setCorrects] = useState(storedCorrects);
  const [errors, setErrors] = useState(storedErrors);
  const [solution, setSolution] = useState("");
  // const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    if (answer != "" && pokemon === answer) {
      setCorrects(corrects + 1);
      setSolution("You win!");
    } else if (answer != "" && pokemon != answer) {
      setErrors(errors + 1);
      setSolution("You lose!");
    }

    localStorage.setItem("corrects", JSON.stringify(corrects));
    localStorage.setItem("errors", JSON.stringify(errors));
  }, [pokemon, answer]);

  return (
    <section className="score">
      <article className="counter-wrap">
        <p className="corrects">{corrects}</p>

        <p className="errors">{errors}</p>
      </article>

      {/* <button onClick={() => setIsReset(true)} className="reset">
        RESET
      </button> */}

      <p
        className={`solution ${
          solution === "You win!" ? "correct" : "incorrect"
        }`}
      >
        {solution}
      </p>
    </section>
  );
};
