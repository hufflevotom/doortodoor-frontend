import { Button, Modal, Result } from "antd";
import React from "react";

function ModalResult({ evClick, show }) {
  return (
    <Modal
      visible={show}
      centered
      footer={false}
      closable={false}
      maskClosable={false}
    >
      <Result
        status="success"
        title="Se habilitaron las rutas correctamente!"
        subTitle="La planificación de folios se ejecutará para el día de mañana."
        extra={[
          <Button type="primary" onClick={evClick}>
            Listo
          </Button>,
        ]}
      />
    </Modal>
  );
}

export default ModalResult;
