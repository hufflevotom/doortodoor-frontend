import { Form, Input, Modal } from "antd";
import React from "react";
import { globalVariables } from "../../global.style";
import "./index.css";

const CargaMasiva = ({ verModal, setVerModal }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={verModal}
      footer={false}
      onCancel={() => setVerModal(false)}
      maskClosable={false}
      maskStyle={{ backgroundColor: globalVariables.color.primary[100] }}
      width={1000}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "30%" }}></div>
        <div
          style={{
            width: "70%",
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <div>
            <h1>Paso 1: Importar archivo</h1>
            <h3>
              Para cargar los folios correctamente se debe subir el archivo de
              la plantilla excel en formato .xlsx
            </h3>
          </div>
          <Form
            layout="vertical"
            form={form}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form.Item name="plantillaExcel">
              <Input
                className="uploadfile-input"
                type="file"
                accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CargaMasiva;
