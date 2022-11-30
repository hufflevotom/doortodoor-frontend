import React, { useEffect, useState } from "react";

import { Button, Modal, Form, Input, Select } from "antd";

import { format, openNotification } from "../../util/utils";
import { otrosService, usuariosService } from "../../services";
import { Otros } from "../../constants/EndPoints";

const ModalUsuario = ({
  datoSeleccionado,
  verModal,
  setVerModal,
  tipo,
  traerDatos,
}) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [loadSave, setLoadSave] = useState(false);
  const [tipoRol, setTipoRol] = useState(false);

  const onSearchRoles = async (value) => {
    try {
      const arr = [];
      const respuesta = await otrosService.getAll(
        Otros.Roles.getAll,
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
      setRoles(arr);
    } catch (error) {
      console.error(error);
    }
  };

  const agregar = async () => {
    setLoadSave(true);
    const documento = form.getFieldValue("documento");
    const contrasena = form.getFieldValue("contrasena");
    const nombre = form.getFieldValue("nombre");
    const apellidos = form.getFieldValue("apellidos");
    const celular = form.getFieldValue("celular");
    const idTipoRol = form.getFieldValue("idTipoRol");
    const brevete = form.getFieldValue("brevete");

    if (
      !documento ||
      !contrasena ||
      !nombre ||
      !apellidos ||
      !celular ||
      !idTipoRol
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
      documento,
      contrasena,
      nombre,
      apellidos,
      celular,
      idTipoRol: typeof idTipoRol === "string" ? idTipoRol : idTipoRol._id,
      brevete,
    };

    try {
      if (tipo === "editar") {
        const respuesta = await usuariosService.update(
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
            "El Usuario se editó correctamente",
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
        const respuesta = await usuariosService.create(data);
        if (respuesta.data.statusCode === 200) {
          traerDatos({
            current: 1,
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20],
          });
          openNotification(
            "Guardado Correctamente",
            "El Usuario se registró correctamente",
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
    onSearchRoles("");
    if (tipo === "editar") {
      setTipoRol(datoSeleccionado.idTipoRol._id === "60bb0fad68bcb70590c9eccd");
      form.setFieldsValue({
        idTipoRol: {
          ...datoSeleccionado.idTipoRol,
          key: datoSeleccionado.idTipoRol._id,
          value: datoSeleccionado.idTipoRol._id,
          label: datoSeleccionado.idTipoRol.descripcion,
        },
        contrasena: "",
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
      title={tipo === "editar" ? "Editar Usuario" : "Agregar Usuario"}
      maskClosable={false}
    >
      <Form
        layout="horizontal"
        form={form}
        initialValues={{ ...datoSeleccionado }}
        {...format}
      >
        <Form.Item label="Documento" name="documento" required>
          <Input type="text" placeholder="Ingrese el documento de identidad" />
        </Form.Item>
        <Form.Item label="Nombres" name="nombre" required>
          <Input type="text" placeholder="Ingrese el nombre" />
        </Form.Item>
        <Form.Item label="Apellidos" name="apellidos" required>
          <Input type="text" placeholder="Ingrese los apellidos" />
        </Form.Item>
        <Form.Item label="Celular" name="celular" required>
          <Input type="text" placeholder="Ingrese los celular" />
        </Form.Item>
        <Form.Item label="Rol" name="idTipoRol" required>
          <Select
            showSearch
            placeholder="Seleccione el rol"
            optionFilterProp="children"
            onSearch={onSearchRoles}
            onSelect={(e) =>
              setTipoRol(e === "60bb0fad68bcb70590c9eccd" ? true : false)
            }
          >
            {roles.map((rol) => (
              <Select.Option key={rol.key} value={rol.value}>
                {rol.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {tipoRol && (
          <Form.Item label="Brevete" name="brevete" required>
            <Input type="text" placeholder="Ingrese el brevete" />
          </Form.Item>
        )}
        <Form.Item label="Contraseña" name="contrasena" required>
          <Input
            type="password"
            placeholder="Ingrese la contraseña"
            autocomplete="new-password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUsuario;
