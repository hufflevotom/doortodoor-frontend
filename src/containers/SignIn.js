import React from "react";
import { Form, Input } from "antd";
import { useAuth } from "../authentication";
import AppNotificationContainer from "../components/AppNotificationContainer";
import { globalVariables } from "../global.style";
import Boton from "../components/Boton/Boton";

const SignIn = () => {
  const { isLoading, error, userLogin } = useAuth();

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    userLogin(values);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(50deg, ${globalVariables.color.primary["100"]} 0%, ${globalVariables.color.primary["dark"]} 90%)`,
      }}
    >
      <div
        style={{
          width: "26%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          borderRadius: "20px",
          backgroundColor: "white",
          padding: "50px",
        }}
      >
        <img
          alt="DoorToDoor-logo"
          src="/assets/images/logo.png"
          style={{ width: "70%", paddingTop: "20px" }}
        />
        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingBotom: "20px",
          }}
        >
          <Form.Item
            rules={[
              { required: true, message: "Ingrese un DNI" },
              {
                type: "string",
                min: 8,
                max: 15,
                message: "No es un DNI válido!",
              },
            ]}
            name="documento"
          >
            <Input placeholder="Ingrese su documento de identidad" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Ingrese su contraseña!" },
              {
                type: "string",
                min: 3,
                message: "Debe tener 3 dígitos como mínimo!",
              },
            ]}
            name="contrasena"
          >
            <Input type="password" placeholder="Ingrese su contraseña" />
          </Form.Item>
          <Form.Item>
            <Boton
              type="submit"
              style={{ width: "100%" }}
              name="Iniciar sesión"
            />
          </Form.Item>
          <span className="gx-text-light gx-fs-sm">
            DNI: 73869994 / Contraseña: P1980sl.
          </span>
        </Form>
        <AppNotificationContainer loading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default SignIn;
