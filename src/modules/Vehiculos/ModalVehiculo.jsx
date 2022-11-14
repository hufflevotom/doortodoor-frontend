import React, { useEffect, useState } from "react";

import { Button, Modal, Form, Input, Select } from "antd";

import { format, openNotification } from "../../util/utils";

const ModalVehiculo = ({
  datoSeleccionado,
  verModal,
  setVerModal,
  tipo,
  traerDatos,
}) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);

  const onSearch = async (value) => {
    try {
      // const respuesta = await httpClient.get(`auth/roles?limit=10&offset=0&busqueda=${value}`);
      // console.log("Roles:", respuesta);
      // setRoles(respuesta.data.body[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const agregar = async () => {
    const nombre = form.getFieldValue("nombre");
    const apellido = form.getFieldValue("apellido");
    const celular = form.getFieldValue("celular");
    const rolId = form.getFieldValue("rolId");
    const email = form.getFieldValue("email");
    const password = form.getFieldValue("password");
    const data = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
      rolId: rolId,
      celular: celular,
    };

    if (tipo === "editar") {
      setVerModal(false);
      // const respuesta = await httpClient.put("auth/usuarios/" + datoSeleccionado.id, data);

      // if (respuesta.data.statusCode === 200) {
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
      // } else {
      //     openNotification("Datos Incompletos", "Complete todos los campos para guardar", "Alerta");
      // }
    } else {
      setVerModal(false);
      // const respuesta = await httpClient.post("auth/usuarios", data);

      // if (respuesta.data.statusCode === 200) {
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
      // } else {
      //     openNotification("Datos Incompletos", "Complete todos los campos para guardar", "Alerta");
      // }
    }
  };

  useEffect(() => {
    if (tipo === "editar") {
      onSearch(datoSeleccionado.role.nombre);
    }
  }, []);

  return (
    <Modal
      visible={verModal}
      footer={
        <Button onClick={agregar} type="primary">
          {tipo === "editar" ? "Editar" : "Agregar"}
        </Button>
      }
      onCancel={() => setVerModal(false)}
      title={tipo === "editar" ? "Editar Usuario" : "Agregar Usuario"}
    >
      <Form
        layout="horizontal"
        form={form}
        initialValues={{ ...datoSeleccionado }}
        {...format}
      >
        <Form.Item label="Nombres" name="nombre" required>
          <Input type="text" placeholder="Ingrese el nombre" />
        </Form.Item>
        <Form.Item label="Apellidos" name="apellido" required>
          <Input type="text" placeholder="Ingrese los apellidos" />
        </Form.Item>
        <Form.Item label="Celular" name="celular" required>
          <Input type="number" placeholder="Ingrese los celular" />
        </Form.Item>
        <Form.Item label="Rol" name="rolId" required>
          <Select
            showSearch
            placeholder="Seleccione el rol"
            optionFilterProp="children"
            // onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {roles.length > 0 &&
              roles.map((rol) => (
                <Select.Option value={rol.id}>{rol.nombre}</Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Correo electrónico" name="email" required>
          <Input type="text" placeholder="Ingrese el correo electrónico" />
        </Form.Item>
        <Form.Item label="Contraseña" name="password" required>
          <Input type="text" placeholder="Ingrese la contraseña" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalVehiculo;
