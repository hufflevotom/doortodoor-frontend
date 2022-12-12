/* eslint-disable default-case */
import { Timeline } from "antd";
import React from "react";

function Estados({ estado }) {
  let recorrido = 0;
  switch (estado) {
    case "No cargado":
      recorrido = 1;
      break;
    case "Pendiente":
      recorrido = 2;
      break;
    case "Reportado":
      recorrido = 3;
      break;
    case "En camino":
      recorrido = 4;
      break;
    case "Entregado":
      recorrido = 5;
      break;
    case "No entregado":
      recorrido = 6;
      break;
  }
  return (
    <Timeline>
      {recorrido === 1 ? (
        <Timeline.Item color="red">No cargado</Timeline.Item>
      ) : (
        <Timeline.Item
          color={recorrido > 2 ? "blue" : recorrido === 2 && "green"}
        >
          Pendiente
        </Timeline.Item>
      )}
      {recorrido === 3 && <Timeline.Item color="red">Reportado</Timeline.Item>}
      <Timeline.Item
        color={recorrido > 4 ? "blue" : recorrido === 4 ? "green" : "gray"}
      >
        En camino
      </Timeline.Item>
      {recorrido > 5 ? (
        <Timeline.Item color="red">No entregado</Timeline.Item>
      ) : (
        <Timeline.Item color={recorrido < 5 ? "gray" : "green"}>
          Entregado
        </Timeline.Item>
      )}
    </Timeline>
  );
}

export default Estados;
