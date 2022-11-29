import { Form, Image, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
// * Styles
import { globalVariables } from "../../global.style";
import "./index.css";
// * Assets
import UploadFile from "../../assets/images/uploadFile.svg";
// * Components
import Boton from "../../components/Boton/Boton";
import { openNotification } from "../../util/utils";
import HabilitarVehiculos from "./HibilitarVehiculos";
// * Services
import { foliosService } from "../../services/folios.service";

const CargaMasiva = ({ verModal, setVerModal }) => {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [dataString, setDataString] = useState("");
  const [visibleHabilitarVehiculos, setVisibleHabilitarVehiculos] =
    useState(false);

  const validarEstadoCarga = async () => {
    setLoader(true);
    const response = await foliosService.validarEstadoCarga();
    if (response.data.statusCode === 200) {
      if (response.data.body === 1) {
        setVisibleHabilitarVehiculos(true);
      } else if (response.data.body === 2) {
        setVerModal(false);
        openNotification(
          "Error",
          "Ya se ha registrado la carga de folios para mañana.",
          "Alerta"
        );
      }
      setLoader(false);
    }
  };

  const cargarArchivo = (ev) => {
    setLoader(true);
    let workBook;
    let jsonData;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: "binary" });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial = { name: XLSX.utils.sheet_to_json(sheet) };
        return initial;
      }, {});
      setDataString(JSON.stringify(jsonData));
      setLoader(false);
    };
    reader.readAsBinaryString(file);
  };

  const subirArchivo = async () => {
    setLoader(true);
    if (dataString === "") {
      openNotification("Error", "No se ha cargado ningún archivo", "Alerta");
      setLoader(false);
      return;
    }
    const response = await foliosService.cargarFolios(dataString);
    if (response.data.statusCode === 200) {
      setVisibleHabilitarVehiculos(true);
      setLoader(false);
    }
  };

  useEffect(() => {
    validarEstadoCarga();
  }, []);

  return (
    <Modal
      visible={verModal}
      centered
      footer={false}
      onCancel={() => setVerModal(false)}
      maskClosable={false}
      maskStyle={{ backgroundColor: globalVariables.color.primary[100] }}
      width={800}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div style={{ width: "40%" }}>
          <Image
            src={UploadFile}
            alt="Upload File Image from UnDraw.co"
            preview={false}
          />
        </div>
        <div
          style={{
            width: "60%",
            margin: "20px",
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
                onChange={(e) => cargarArchivo(e)}
              />
            </Form.Item>
          </Form>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Boton
              type="primary"
              onClick={subirArchivo}
              name="Subir archivo"
              loader={loader}
            />
          </div>
        </div>
      </div>
      <HabilitarVehiculos
        verModal={visibleHabilitarVehiculos}
        setVerModal={setVisibleHabilitarVehiculos}
        setVerModalCarga={setVerModal}
      />
    </Modal>
  );
};

export default CargaMasiva;
