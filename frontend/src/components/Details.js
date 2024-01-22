import React from "react";
import uniqid from "uniqid";
import style from "../styles/Details.module.css";

const Details = (props) => {
  function handleInvalid(e) {
    const validityState = e.target.validity;
    if (validityState.valueMissing)
      e.target.setCustomValidity("Bitte füllen Sie dieses Feld aus");
  }
  function test(e) {
    const validityState = e.target.validity;
    if (!validityState.valueMissing) e.target.setCustomValidity("");
  }
  //return <div>{props.name}</div>;
  if (props.name === "key") return;
  return (
    <div className={style.element}>
      <label htmlFor={uniqid()}>{props.name}</label>
      <input
        className={style.inputfield}
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onInput={test}
        onInvalid={handleInvalid}
        required
      ></input>
    </div>
  );
};

export { Details };
