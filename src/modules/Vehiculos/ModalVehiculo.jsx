import React, { useEffect, useState } from "react";

import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import "moment/locale/es-mx";
import locale from "antd/es/date-picker/locale/es_ES";

import { format, openNotification } from "../../util/utils";
import { otrosService, vehiculosService } from "../../services";
import { Otros } from "../../constants/EndPoints";

const ModalVehiculo = ({
  datoSeleccionado,
  verModal,
  setVerModal,
  tipo,
  traerDatos,
}) => {
  const [form] = Form.useForm();
  const [estado, setEstado] = useState([]);
  const [loadSave, setLoadSave] = useState(false);

  const [fechaFabricacion, setFechaFabricacion] = useState();
  const [vencimientoSoat, setVencimientoSoat] = useState();
  const [vencimientoRevision, setVencimientoRevision] = useState();

  const onSearchEstado = async (value) => {
    try {
      const arr = [];
      const respuesta = await otrosService.getAll(
        Otros.Estado.getAll,
        10,
        0,
        value
      );
      respuesta.data.body.forEach((item) => {
        arr.push({
          ...item,
          key: item._id,
          value: item._id,
          label: item.descripcion,
        });
      });
      setEstado(arr);
    } catch (error) {
      console.error(error);
    }
  };

  const agregar = async () => {
    setLoadSave(true);
    const placa = form.getFieldValue("placa");
    const marca = form.getFieldValue("marca");
    const color = form.getFieldValue("color");
    const modelo = form.getFieldValue("modelo");
    const fechaFabricacion = form.getFieldValue("fechaFabricacion");
    const idEstadoVehiculo = form.getFieldValue("idEstadoVehiculo");
    const vencimientoSoat = form.getFieldValue("vencimientoSoat");
    const vencimientoRevision = form.getFieldValue("vencimientoRevision");

    if (
      !placa ||
      !fechaFabricacion ||
      !vencimientoSoat ||
      !vencimientoRevision ||
      !idEstadoVehiculo
    ) {
      openNotification(
        "Datos Incompletos",
        "Complete todos los campos para guardar",
        "Alerta"
      );
      setLoadSave(false);
      return;
    }

    const data = {
      placa,
      marca,
      color,
      modelo,
      fechaFabricacion,
      idEstadoVehiculo:
        typeof idEstadoVehiculo === "string"
          ? idEstadoVehiculo
          : idEstadoVehiculo._id,
      vencimientoSoat,
      vencimientoRevision,
    };

    try {
      if (tipo === "editar") {
        const respuesta = await vehiculosService.update(
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
            "El Vehículo se editó correctamente",
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
        const respuesta = await vehiculosService.create(data);
        if (respuesta.data.statusCode === 200) {
          traerDatos({
            current: 1,
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20],
          });
          openNotification(
            "Guardado Correctamente",
            "El Vehículo se registró correctamente",
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
    onSearchEstado("");
    if (tipo === "editar") {
      form.setFieldsValue({
        idEstadoVehiculo: {
          ...datoSeleccionado.idEstadoVehiculo,
          key: datoSeleccionado.idEstadoVehiculo._id,
          value: datoSeleccionado.idEstadoVehiculo._id,
          label: datoSeleccionado.idEstadoVehiculo.descripcion,
        },
      });
      setFechaFabricacion(datoSeleccionado.fechaFabricacion || null);
      setVencimientoSoat(datoSeleccionado.vencimientoSoat || null);
      setVencimientoRevision(datoSeleccionado.vencimientoRevision || null);
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
      title={tipo === "editar" ? "Editar Vehículo" : "Agregar Vehículo"}
      maskClosable={false}
    >
      <Form
        layout="horizontal"
        form={form}
        initialValues={{ ...datoSeleccionado }}
        {...format}
      >
        <Form.Item label="Placa" name="placa" required>
          <Input type="text" placeholder="Ingrese la placa del vehículo" />
        </Form.Item>
        <Form.Item label="Marca" name="marca">
          <Input type="text" placeholder="Ingrese la marca del vehículo" />
        </Form.Item>
        <Form.Item label="Color" name="color">
          <Input type="text" placeholder="Ingrese el color del vehículo" />
        </Form.Item>
        <Form.Item label="Modelo" name="modelo">
          <Input type="text" placeholder="Ingrese el modelo del vehículo" />
        </Form.Item>
        <Form.Item label="F. Fabricación" name="fechaFabricacion" required>
          <DatePicker
            placeholder="Ingrese la fecha de fabricación"
            style={{ width: "100%" }}
            locale={locale}
            format="DD/MM/YYYY"
            value={fechaFabricacion}
            onChange={(e) => setFechaFabricacion(e)}
          />
        </Form.Item>
        <Form.Item label="Estado" name="idEstadoVehiculo" required>
          <Select
            showSearch
            placeholder="Seleccione el estado"
            optionFilterProp="children"
            onSearch={onSearchEstado}
          >
            {estado.map((rol) => (
              <Select.Option key={rol.key} value={rol.value}>
                {rol.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="F.V. SOAT" name="vencimientoSoat" required>
          <DatePicker
            placeholder="Ingrese la fecha de vencimiento SOAT"
            style={{ width: "100%" }}
            locale={locale}
            format="DD/MM/YYYY"
            value={vencimientoSoat}
            onChange={(e) => setVencimientoSoat(e)}
          />
        </Form.Item>
        <Form.Item label="F.V. Revisión" name="vencimientoRevision" required>
          <DatePicker
            placeholder="Ingrese la fecha de vencimiento de la Revisión"
            style={{ width: "100%" }}
            locale={locale}
            format="DD/MM/YYYY"
            value={vencimientoRevision}
            onChange={(e) => setVencimientoRevision(e)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalVehiculo;
