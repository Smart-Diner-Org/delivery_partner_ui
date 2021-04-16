import style from "./PrimaryButton.module.css";
import React from "react";

function PrimaryButton({ name, onClick }) {
  return (
    <button className={style.primary_button} onClick={onClick}>
      {name}
    </button>
  );
}

export default PrimaryButton;
