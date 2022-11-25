/* eslint-disable default-case */
import { CarTwoTone, GiftTwoTone } from "@ant-design/icons";
import React from "react";
import { Marker } from "react-map-gl";
import { globalVariables } from "../../global.style";

function Pin({ longitude, latitude, type, state }) {
  let color = globalVariables.color.gris[100];
  switch (state) {
    case "Entregado":
      color = globalVariables.color.verde[100];
      break;
    case "No entregado":
      color = globalVariables.color.rojo[100];
      break;
    case "No cargado":
      color = globalVariables.color.amarillo[100];
      break;
    case "En camino":
      color = globalVariables.color.secondary[100];
      break;
    case "Pendiente":
      color = globalVariables.color.gris[100];
      break;
  }
  const style = { fontSize: "30px" };
  const pin =
    type === "Folio" ? (
      <GiftTwoTone style={style} twoToneColor={color} />
    ) : (
      <CarTwoTone style={style} />
    );
  return (
    <Marker longitude={longitude} latitude={latitude}>
      {pin}
    </Marker>
  );
}

export default Pin;
