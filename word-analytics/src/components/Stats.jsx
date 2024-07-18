import React from "react";
import { FACEBOOK_MAX_CHARACTERS, INSTAGRAM_MAX_CHARACTERS } from "../lib/constants";

export default function Stats({text}) {
  const checkWords = (text)  => {
    const count = text.split(/\s/).filter((word) => word !== "").length
    return count;
  }

  return (
    <section className="stats">
      <Stat label="Words" number={checkWords(text)}/>
      <Stat label="Characters" number={text.length}/>
      <Stat label="Instagram" number={INSTAGRAM_MAX_CHARACTERS - text.length}/>
      <Stat label="Facebook" number={FACEBOOK_MAX_CHARACTERS - text.length}/>
    </section>
  );
}

function Stat({ label, number}) {
  return (
    <section className="stat">
      { number < 0 ? <span className="stat__number" style={{color: "red"}}> { number } </span>
        : <span className="stat__number"> { number } </span> }
      <h2 className="second-heading"> {label} </h2>
    </section>
  );
}
