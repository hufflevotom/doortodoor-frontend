/* eslint-disable default-case */
import React from "react";
import { Button } from "antd";
import { globalVariables } from "../../global.style";

const Boton = ({ name, onClick, style, type = "primary" }) => {
  let estilo = { margin: 0, fontSize: "14px" };
  switch (type) {
    case "submit":
      estilo.backgroundColor = globalVariables.color.secondary["100"];
      estilo.color = globalVariables.color.blanco;
      break;
    case "primary":
      estilo.backgroundColor = globalVariables.color.secondary["100"];
      estilo.color = globalVariables.color.blanco;
      break;
    case "secondary":
      estilo.backgroundColor = globalVariables.color.primary["100"];
      estilo.color = globalVariables.color.blanco;
      break;
  }
  if (type === "submit") {
    return (
      <Button
        type={type}
        htmlType="submit"
        onClick={
          onClick
            ? onClick
            : () => {
                console.log(`Click en ${name}`);
              }
        }
        style={{ ...estilo, ...style }}
      >
        {name}
      </Button>
    );
  }
  return (
    <Button onClick={onClick} style={{ ...estilo, ...style }}>
      {name}
    </Button>
  );
};

export default Boton;
