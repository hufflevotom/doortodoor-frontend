import React, { useEffect, useState } from "react";
import { Form, Image, Modal, Select } from "antd";
// * Styles
import { globalVariables } from "../../global.style";
import "./index.css";
// * Assets
import EnableVehicles from "../../assets/images/enableVehicles.svg";
// * Components
import Boton from "../../components/Boton/Boton";
import { openNotification } from "../../util/utils";
// * Services
import {
  foliosService,
  vehiculosService,
  usuariosService,
  responsablesService,
} from "../../services";
import ModalResult from "./ModalResult";

const HabilitarVehiculos = ({ verModal, setVerModal, setVerModalCarga }) => {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [verResult, setVerResult] = useState(false);
  const [rutas, setRutas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [repartidores, setRepartidores] = useState([]);

  const obtenerRutas = async () => {
    setLoader(true);
    const response = await foliosService.getRutas();
    if (response.data.statusCode === 200) {
      form.setFieldsValue({
        responsables: response.data.body.map((b, i) => ({ key: i, ruta: b })),
      });
      setRutas(response.data.body.map((b, i) => ({ key: b, id: b })));
      setLoader(false);
    }
  };

  const obtenerVehiculos = async (searchText) => {
    setLoader(true);
    const response = await vehiculosService.getAll(10, 0, searchText);
    if (response.data.statusCode === 200) {
      setVehiculos(response.data.body);
      setLoader(false);
    }
  };

  const obtenerRepartidores = async (searchText) => {
    setLoader(true);
    const response = await usuariosService.getRepartidores(10, 0, searchText);
    if (response.data.statusCode === 200) {
      setRepartidores(response.data.body);
      setLoader(false);
    }
  };

  const habilitarVehiculos = async () => {
    setLoader(true);
    const data = form.getFieldsValue();
    data.responsables.forEach((r) => {
      if (!r.idVehiculo || !r.idRepartidor) {
        openNotification(
          "Error",
          "Seleccione todos los campos para las rutas",
          "Alerta"
        );
        setLoader(false);
        return;
      }
    });
    const body = {
      responsables: data.responsables,
    };
    const response = await responsablesService.insertMany(body);
    if (response.data.statusCode === 200) {
      setLoader(false);
      setVerResult(true);
    }
  };

  const cerrarResult = () => {
    setVerResult(false);
    setVerModal(false);
    setVerModalCarga(false);
  };

  useEffect(() => {
    if (verModal) {
      obtenerRutas();
      obtenerVehiculos();
      obtenerRepartidores();
    }
  }, [verModal]);

  return (
    <Modal
      visible={verModal}
      centered
      footer={false}
      closable={false}
      maskClosable={false}
      maskStyle={{ backgroundColor: globalVariables.color.secondary[100] }}
      width={1000}
    >
      <div style={{ margin: "0 10px" }}>
        <h1>Paso 2: Habilitar vehículos</h1>
        <h3>
          A continuación se deben asignar los vehículos y repartidores para cada
          ruta. Solo se muestran los vehículos con el estado "Libre".
        </h3>
      </div>
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
        <div
          style={{
            width: "55%",
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <Form
            layout="vertical"
            form={form}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Form.List name="responsables">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div
                      key={field.key}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                      }}
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "ruta"]}
                        fieldKey={[field.fieldKey, "ruta"]}
                        rules={[
                          { required: true, message: "Selecciona una ruta" },
                        ]}
                      >
                        <Select
                          placeholder="Selecciona una ruta"
                          style={{ width: "80px" }}
                          loading={loader}
                        >
                          {rutas.map((ruta) => (
                            <Select.Option key={ruta.key} value={ruta.id}>
                              {ruta.id}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "idVehiculo"]}
                        fieldKey={[field.fieldKey, "idVehiculo"]}
                        rules={[
                          { required: true, message: "Selecciona un vehículo" },
                        ]}
                      >
                        <Select
                          placeholder="Placa"
                          style={{ width: "180px" }}
                          loading={loader}
                        >
                          {vehiculos.map((vehiculo) => (
                            <Select.Option
                              key={vehiculo._id}
                              value={vehiculo._id}
                            >
                              {vehiculo.placa}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "idUsuario"]}
                        fieldKey={[field.fieldKey, "idUsuario"]}
                        rules={[
                          {
                            required: true,
                            message: "Selecciona un repartidor",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Repartidor"
                          style={{ width: "180px" }}
                          loading={loader}
                        >
                          {repartidores.map((repartidor) => (
                            <Select.Option
                              key={repartidor._id}
                              value={repartidor._id}
                            >
                              {repartidor.documento}/{repartidor.nombre}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Form>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Boton
              type="primary"
              onClick={habilitarVehiculos}
              name="Habilitar"
              loader={loader}
            />
          </div>
        </div>
        <div style={{ width: "45%", margin: "0 20px" }}>
          <Image
            src={EnableVehicles}
            alt="Enable Vehicles Image from UnDraw.co"
            preview={false}
          />
        </div>
      </div>
      <ModalResult evClick={cerrarResult} show={verResult} />
    </Modal>
  );
};

export default HabilitarVehiculos;
