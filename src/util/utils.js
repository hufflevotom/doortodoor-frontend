import { notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const openNotification = (titulo, texto, tipo) => {
  const key = `open${Date.now()}`;
  notification.open({
    duration: 2,
    style: { color: tipo === "Alerta" ? "red" : "#52c41a" },
    icon: tipo === "Alerta" ? <CloseCircleOutlined /> : <CheckCircleOutlined />,

    message: titulo,
    description: texto,
    key,
  });
};

export const formatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});
