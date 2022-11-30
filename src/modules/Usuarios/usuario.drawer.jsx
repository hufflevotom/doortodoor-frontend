import React from "react";

import { Drawer, Row, Col } from "antd";
import { SmileTwoTone } from "@ant-design/icons";

const SectionTitleItem = ({ children }) => (
  <div style={{ fontSize: "18px", margin: "20px 0" }}>{children}</div>
);

const DescriptionItem = ({ title, content }) => (
  <div style={{ marginBottom: "20px" }}>
    <p style={{ fontSize: "16px", marginBottom: "5px" }}>{title}:</p>
    {content}
  </div>
);

const InfoUsuario = ({ data, show, setShow }) => {
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
        <SmileTwoTone /> {data.documento}
      </p>
      <SectionTitleItem>Detalles</SectionTitleItem>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <DescriptionItem title="Nombre(s)" content={data.nombre} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Apellidos" content={data.apellidos} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Celular" content={data.celular} />
        </Col>
        <Col span={24}>
          <DescriptionItem title="Rol" content={data.idTipoRol.descripcion} />
        </Col>
        {data.brevete && (
          <Col span={24}>
            <DescriptionItem title="Brevete" content={data.brevete} />
          </Col>
        )}
      </Row>
    </Drawer>
  );
};

export default InfoUsuario;
