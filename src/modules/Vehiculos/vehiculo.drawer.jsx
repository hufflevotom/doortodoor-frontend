import React from "react";

import { Drawer, Row, Col, Divider } from "antd";
import { CarTwoTone } from "@ant-design/icons";

const SectionTitleItem = ({ children }) => (
  <div style={{ fontSize: "18px", margin: "20px 0" }}>{children}</div>
);

const DescriptionItem = ({ title, content }) => (
  <div style={{ marginBottom: "20px" }}>
    <p style={{ fontSize: "16px", marginBottom: "5px" }}>{title}:</p>
    {content}
  </div>
);

const InfoVehiculo = ({ data, show, setShow }) => {
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
        <CarTwoTone /> {data.placa}
      </p>
      <SectionTitleItem>Detalles</SectionTitleItem>
      <Row style={{ width: "100%" }}>
        <Col span={12}>
          <DescriptionItem title="Marca" content={data.marca} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Color" content={data.color} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Modelo" content={data.modelo} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Año Fabricación"
            content={data.fechaFabricacion.format("YYYY")}
          />
        </Col>
      </Row>
      <Divider />
      <SectionTitleItem>Mantenimiento</SectionTitleItem>
      <Row style={{ width: "100%" }}>
        <Col span={20}>
          <DescriptionItem
            title="Fecha de Vencimiento SOAT"
            content={data.vencimientoSoat.format("DD/MM/YYYY")}
          />
        </Col>
        <Col span={20}>
          <DescriptionItem
            title="Fecha de Vencimiento Revisión Técnica"
            content={data.vencimientoRevision.format("DD/MM/YYYY")}
          />
        </Col>
        <Col span={20}>
          <DescriptionItem
            title="Estado"
            content={data.idEstadoVehiculo.descripcion}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default InfoVehiculo;
