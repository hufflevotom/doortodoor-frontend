import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Collapse,
  TimePicker,
} from "antd";
import "moment/locale/es-mx";
import locale from "antd/es/date-picker/locale/es_ES";
import moment from "moment";

import { openNotification } from "../../util/utils";
import { foliosService } from "../../services";

const ModalFolios = ({
  datoSeleccionado,
  verModal,
  setVerModal,
  tipo,
  traerDatos,
}) => {
  const [form] = Form.useForm();
  const [loadSave, setLoadSave] = useState(false);
  const [fechaEntrega, setFechaEntrega] = useState();
  const [horaInicio, setHoraInicio] = useState();
  const [horaFinal, setHoraFinal] = useState();

  const agregar = async () => {
    setLoadSave(true);
    const dataForm = form.getFieldsValue();

    if (
      !dataForm.descripcionPedido ||
      !dataForm.direccion ||
      !dataForm.distrito ||
      !dataForm.dni ||
      !dataForm.fechaEntrega ||
      !dataForm.finVisita ||
      !dataForm.inicioVisita ||
      !dataForm.latitud ||
      !dataForm.localAbastecimiento ||
      !dataForm.longitud ||
      !dataForm.nombre ||
      !dataForm.numeroFolio ||
      !dataForm.ordenEntrega ||
      !dataForm.ruta ||
      !dataForm.telefono
    ) {
      openNotification(
        "Datos Incompletos",
        "Complete todos los campos para guardar",
        "Alerta"
      );
      setLoadSave(false);
      return;
    }

    const inicioVisita = dataForm.inicioVisita.format("HH:mm").split(":");
    const finVisita = dataForm.finVisita.format("HH:mm").split(":");
    const data = {
      numeroFolio: dataForm.numeroFolio,
      ruta: dataForm.ruta,
      idDetalleCliente: {
        nombre: dataForm.nombre,
        dni: dataForm.dni,
        telefono: dataForm.telefono,
        direccion: dataForm.direccion,
      },
      idDetalleEntrega: {
        fechaEntrega: dataForm.fechaEntrega.toISOString(),
        idUbicacionEntrega: {
          latitud: dataForm.latitud,
          longitud: dataForm.longitud,
          distrito: dataForm.distrito,
        },
        ordenEntrega: parseInt(dataForm.ordenEntrega, 10),
        idHorarioVisita: {
          inicioVisita: parseInt(inicioVisita[0] + inicioVisita[1], 10),
          finVisita: parseInt(finVisita[0] + finVisita[1], 10),
        },
      },
      idDetallePedido: {
        descripcionPedido: dataForm.descripcionPedido,
      },
      idLocalAbastecimiento: {
        localAbastecimiento: dataForm.localAbastecimiento,
      },
    };

    try {
      if (tipo === "editar") {
        const respuesta = await foliosService.update(
          datoSeleccionado._id,
          data
        );
        if (respuesta.data.statusCode === 200) {
          traerDatos({
            current: 1,
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20],
          });
          openNotification(
            "Editado Correctamente",
            "El Folio se editó correctamente",
            ""
          );
          setVerModal(false);
          setLoadSave(false);
        } else {
          openNotification(
            "Datos Incompletos",
            "Complete todos los campos para guardar",
            "Alerta"
          );
        }
      } else {
        const respuesta = await foliosService.create(data);
        if (respuesta.data.statusCode === 200) {
          traerDatos({
            current: 1,
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20],
          });
          openNotification(
            "Guardado Correctamente",
            "El Folio se registró correctamente",
            ""
          );
          setVerModal(false);
          setLoadSave(false);
        } else {
          openNotification(
            "Datos Incompletos",
            "Complete todos los campos para guardar",
            "Alerta"
          );
        }
      }
    } catch (e) {
      openNotification(
        "Error",
        "Ocurrió un error al guardar: " + e.response.data.message,
        "Alerta"
      );
      setLoadSave(false);
      return;
    }
  };

  useEffect(() => {
    if (tipo === "editar") {
      setFechaEntrega(datoSeleccionado.idDetalleEntrega.fechaEntrega || null);
      setHoraInicio(
        datoSeleccionado.idDetalleEntrega.idHorarioVisita.inicioVisita || null
      );
      setHoraFinal(
        datoSeleccionado.idDetalleEntrega.idHorarioVisita.finVisita || null
      );
      form.setFieldsValue({
        ...datoSeleccionado,
        ...datoSeleccionado.idDetalleCliente,
        ...datoSeleccionado.idDetalleEntrega,
        ...datoSeleccionado.idDetalleEntrega.idHorarioVisita,
        ...datoSeleccionado.idDetalleEntrega.idUbicacionEntrega,
        ...datoSeleccionado.idDetallePedido,
        ...datoSeleccionado.idLocalAbastecimiento,
      });
    }
  }, []);

  return (
    <Modal
      visible={verModal}
      footer={
        <Button onClick={agregar} type="primary" loading={loadSave}>
          {tipo === "editar" ? "Editar" : "Agregar"}
        </Button>
      }
      onCancel={() => setVerModal(false)}
      title={tipo === "editar" ? "Editar Folio" : "Agregar Folio"}
      maskClosable={false}
      width={900}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{ ...datoSeleccionado }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "100%",
          }}
        >
          <div style={{ width: "40%" }}>
            <Form.Item label="Número de folio" name="numeroFolio" required>
              <Input type="number" placeholder="Ingrese el número de folio" />
            </Form.Item>
            <Form.Item label="Número de ruta" name="ruta" required>
              <Input type="number" placeholder="Ingrese el número de ruta" />
            </Form.Item>
            <Form.Item
              label="Local de abastecimiento"
              name="localAbastecimiento"
              required
            >
              <Input
                type="number"
                placeholder="Ingrese el codigo del local de abastecimiento"
              />
            </Form.Item>
            <Form.Item
              label="Descripción del producto"
              name="descripcionPedido"
              required
            >
              <Input.TextArea
                type="text"
                placeholder="Ingrese la descripción del pedido"
              />
            </Form.Item>
          </div>
          <div style={{ width: "60%" }}>
            <Collapse bordered={false} defaultActiveKey={["1"]} accordion>
              <Collapse.Panel header="Datos del cliente" key="1">
                <Form.Item label="Documento de identidad" name="dni" required>
                  <Input
                    type="text"
                    placeholder="Ingrese el documento de identidad"
                  />
                </Form.Item>
                <Form.Item label="Nombre del cliente" name="nombre" required>
                  <Input
                    type="text"
                    placeholder="Ingrese el nombre del cliente"
                  />
                </Form.Item>
                <Form.Item label="Teléfono / Celular" name="telefono" required>
                  <Input
                    type="text"
                    placeholder="Ingrese el número de contacto"
                  />
                </Form.Item>
                <Form.Item label="Dirección" name="direccion" required>
                  <Input
                    type="text"
                    placeholder="Ingrese la dirección del cliente"
                  />
                </Form.Item>
              </Collapse.Panel>
              <Collapse.Panel header="Datos de la entrega" key="2">
                <Form.Item
                  label="Fecha de entrega"
                  name="fechaEntrega"
                  required
                >
                  <DatePicker
                    placeholder="Ingrese la fecha de entrega"
                    style={{ width: "100%" }}
                    locale={locale}
                    format="DD/MM/YYYY"
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e)}
                  />
                </Form.Item>
                <Form.Item
                  label="Orden de entrega"
                  name="ordenEntrega"
                  required
                >
                  <Input
                    type="number"
                    placeholder="Ingrese el número de orden de entrega"
                  />
                </Form.Item>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                  }}
                >
                  <Form.Item
                    label="Hora de inicio de entrega"
                    name="inicioVisita"
                    style={{ width: "100%" }}
                    required
                  >
                    <TimePicker
                      use12Hours
                      format="HH:mm A"
                      placeholder="Ingrese la hora de inicio de entrega"
                      style={{ width: "100%" }}
                      locale={locale}
                      value={horaInicio}
                      onChange={(e) => setHoraInicio(e)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Hora final de entrega"
                    name="finVisita"
                    style={{ width: "100%" }}
                    required
                  >
                    <TimePicker
                      use12Hours
                      format="HH:mm A"
                      placeholder="Ingrese la hora final de entrega"
                      style={{ width: "100%" }}
                      locale={locale}
                      value={horaFinal}
                      onChange={(e) => setHoraFinal(e)}
                    />
                  </Form.Item>
                </div>
                <Form.Item label="Distrito" name="distrito" required>
                  <Input
                    type="text"
                    placeholder="Ingrese el distrito de entrega"
                    onChange={(e) =>
                      form.setFieldValue(
                        "distrito",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                </Form.Item>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                  }}
                >
                  <Form.Item
                    label="Latitud"
                    name="latitud"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input type="number" placeholder="Ingrese la latitud" />
                  </Form.Item>
                  <Form.Item
                    label="Longitud"
                    name="longitud"
                    style={{ width: "100%" }}
                    required
                  >
                    <Input type="number" placeholder="Ingrese la longitud" />
                  </Form.Item>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalFolios;
