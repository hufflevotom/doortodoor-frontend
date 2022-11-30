import React from "react";

import { Drawer, Row, Col, Divider } from "antd";
import { GiftTwoTone } from "@ant-design/icons";

const SectionTitleItem = ({ children }) => (
  <div style={{ fontSize: "18px", margin: "20px 0" }}>{children}</div>
);

const DescriptionItem = ({ title, content }) => (
  <div style={{ marginBottom: "20px" }}>
    <p style={{ fontSize: "16px", marginBottom: "5px" }}>{title}:</p>
    {content}
  </div>
);

const InfoFolio = ({ data, show, setShow }) => {
  return (
    <Drawer
      width={1000}
      placement="right"
      closable={false}
      onClose={() => setShow(false)}
      open={show}
    >
      <p
        style={{
          marginBottom: 24,
          fontSize: "24px",
        }}
      >
        <GiftTwoTone /> {data.numeroFolio}
      </p>
      <SectionTitleItem>Detalles</SectionTitleItem>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <DescriptionItem title="Número de Ruta" content={data.ruta} />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="Local de Abastecimiento"
            content={data.idLocalAbastecimiento.localAbastecimiento}
          />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="Modelo"
            content={data.idDetallePedido.descripcionPedido}
          />
        </Col>
      </Row>
      <Divider />
      <SectionTitleItem>Detalles del Cliente</SectionTitleItem>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <DescriptionItem
            title="Documento de Identidad"
            content={data.idDetalleCliente.dni}
          />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="Nombre"
            content={data.idDetalleCliente.nombre}
          />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="Telefono / Celular"
            content={data.idDetalleCliente.telefono}
          />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="Dirección"
            content={data.idDetalleCliente.direccion}
          />
        </Col>
      </Row>
      <Divider />
      <SectionTitleItem>Detalles de Entrega</SectionTitleItem>
      <Row style={{ width: "100%" }}>
        <Col span={14}>
          <DescriptionItem
            title="Fecha Programada"
            content={data.idDetalleEntrega.fechaEntrega.format("DD/MM/YYYY")}
          />
        </Col>
        <Col span={10}>
          <DescriptionItem
            title="#Entrega"
            content={data.idDetalleEntrega.ordenEntrega}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Hora de incio"
            content={data.idDetalleEntrega.idHorarioVisita.inicioVisita.format(
              "HH:mm"
            )}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Hora de fin"
            content={data.idDetalleEntrega.idHorarioVisita.finVisita.format(
              "HH:mm"
            )}
          />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="Distrito"
            content={data.idDetalleEntrega.idUbicacionEntrega.distrito}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Longitud"
            content={data.idDetalleEntrega.idUbicacionEntrega.longitud}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Latitud"
            content={data.idDetalleEntrega.idUbicacionEntrega.latitud}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default InfoFolio;
