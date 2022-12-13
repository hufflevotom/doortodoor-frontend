import { Col, Row } from "antd";
import React from "react";

function InfoFolio({ evidencia }) {
  return (
    <Row style={{ width: "100%", margin: 0, padding: 0 }}>
      <Col xs={7}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h4 style={{ marginBottom: "15px" }}>Folio</h4>
          <span>Número: {evidencia.folio.numeroFolio}</span>
          <span>Estado: {evidencia.folio.idEstado.descripcion}</span>
          <span>
            Orden de entrega: {evidencia.folio.idDetalleEntrega.ordenEntrega}
          </span>
          <span>
            Horario de visita:{" "}
            {`${
              evidencia.folio.idDetalleEntrega.idHorarioVisita.inicioVisita.toString()
                .length === 3
                ? `0${evidencia.folio.idDetalleEntrega.idHorarioVisita.inicioVisita
                    .toString()
                    .substring(
                      0,
                      1
                    )}:${evidencia.folio.idDetalleEntrega.idHorarioVisita.inicioVisita
                    .toString()
                    .substring(1, 3)}`
                : `${evidencia.folio.idDetalleEntrega.idHorarioVisita.inicioVisita
                    .toString()
                    .substring(
                      0,
                      2
                    )}:${evidencia.folio.idDetalleEntrega.idHorarioVisita.inicioVisita
                    .toString()
                    .substring(2, 4)}`
            } ${
              evidencia.folio.idDetalleEntrega.idHorarioVisita.inicioVisita >
              1200
                ? "PM"
                : "AM"
            } - ${
              evidencia.folio.idDetalleEntrega.idHorarioVisita.finVisita.toString()
                .length === 3
                ? `0${evidencia.folio.idDetalleEntrega.idHorarioVisita.finVisita
                    .toString()
                    .substring(
                      0,
                      1
                    )}:${evidencia.folio.idDetalleEntrega.idHorarioVisita.finVisita
                    .toString()
                    .substring(1, 3)}`
                : `${evidencia.folio.idDetalleEntrega.idHorarioVisita.finVisita
                    .toString()
                    .substring(
                      0,
                      2
                    )}:${evidencia.folio.idDetalleEntrega.idHorarioVisita.finVisita
                    .toString()
                    .substring(2, 4)}`
            } ${
              evidencia.folio.idDetalleEntrega.idHorarioVisita.finVisita > 1200
                ? "PM"
                : "AM"
            }`}
          </span>
          <span>
            Detalle: {evidencia.folio.idDetallePedido.descripcionPedido}
          </span>
        </div>
      </Col>
      <Col xs={7}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h4 style={{ marginBottom: "15px" }}>Cliente</h4>
          <span>Documento: {evidencia.folio.idDetalleCliente.dni}</span>
          <span>Nombre: {evidencia.folio.idDetalleCliente.nombre}</span>
          <span>Teléfonos: {evidencia.folio.idDetalleCliente.telefono}</span>
          <span>Dirección: {evidencia.folio.idDetalleCliente.direccion}</span>
          <span>
            Distrito:{" "}
            {evidencia.folio.idDetalleEntrega.idUbicacionEntrega.distrito}
          </span>
        </div>
      </Col>
      <Col xs={5}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h4 style={{ marginBottom: "15px" }}>Vehículo</h4>
          <span>Placa: {evidencia.responsable.idVehiculo.placa}</span>
          <span>Marca: {evidencia.responsable.idVehiculo.marca}</span>
          <span>Modelo: {evidencia.responsable.idVehiculo.modelo}</span>
          <span>Color: {evidencia.responsable.idVehiculo.color}</span>
        </div>
      </Col>
      <Col xs={5}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h4 style={{ marginBottom: "15px" }}>Responsable</h4>
          <span>Documento: {evidencia.responsable.idUsuario.documento}</span>
          <span>Nombre: {evidencia.responsable.idUsuario.nombre}</span>
          <span>Apellidos: {evidencia.responsable.idUsuario.apellidos}</span>
          <span>Celular: {evidencia.responsable.idUsuario.celular}</span>
          <span>Ruta: {evidencia.responsable.ruta}</span>
        </div>
      </Col>
    </Row>
  );
}

export default InfoFolio;
