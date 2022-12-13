import { useState } from "react";
import { Button, Card, Col, Divider, Row } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Estados from "./estados.timeline";
import Busqueda from "./busqueda.form";
import InfoFolio from "./infoFolio.container";
import InfoEvidencias from "./infoEvidencias.container";

const Evidencias = () => {
  const [evidencia, setEvidencia] = useState();
  return (
    <Card>
      {evidencia ? (
        <Row>
          <Col xs={24} style={{ marginBottom: "10px" }}>
            <Button
              type="text"
              icon={<LeftOutlined />}
              onClick={() => {
                setEvidencia();
              }}
            >
              Nueva búsqueda
            </Button>
          </Col>
          <Col xs={20}>
            <InfoFolio evidencia={evidencia} />
          </Col>
          <Col xs={4}>
            <Estados estado={evidencia.folio.idEstado.descripcion} />
          </Col>
          <Col xs={24}>
            <Divider />
            <InfoEvidencias evidencia={evidencia} />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={24}>
            <Busqueda setEvidencia={setEvidencia} />
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default Evidencias;
