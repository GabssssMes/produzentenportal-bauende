import React from "react";
import uniqid from "uniqid";
import style from "../styles/WechselrichterData.module.css";
import CircumIcon from "@klarr-agency/circum-icons-react"; // React

const WechselrichterData = (props) => {
  const details = (name, value, onChange, key) => {
    if (name === "key") return;
    return (
      <div>
        <label htmlFor={name}>{name}</label>
        <input
          className={style.inputfield}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onInput={test}
          onInvalid={handleInvalid}
          required
        ></input>
      </div>
    );
  };
  function handleInvalid(e) {
    const validityState = e.target.validity;
    if (validityState.valueMissing)
      e.target.setCustomValidity("Bitte füllen Sie dieses Feld aus");
  }
  function test(e) {
    const validityState = e.target.validity;
    if (!validityState.valueMissing) e.target.setCustomValidity("");
  }

  return (
    <div className={style.element}>
      {props.elements.map((detail, index) => {
        return details(detail, props.value[index], props.onChange, uniqid());
      })}
      <div className={style.buttons}>
        <div
          id={style.buttonAdd}
          onClick={props.addItem}
          className={style.divButton}
        >
          Weiteren Wechselrichter hinzufügen
        </div>
        <div
          id={style.buttonRemove}
          onClick={props.removeItem}
          className={style.divButton}
          title="Wechselrichter entfernen"
        >
          <CircumIcon name="trash" />
        </div>
      </div>
    </div>
  );
};

export { WechselrichterData };
