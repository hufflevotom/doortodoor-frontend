/* @hufflevotom
! IMPORTANTE:
!  - Los modulos deben ser los mismos que los de la base de datos
!  - La ruta debe respetar los nombres y orden de las carpetas
*/

import {
  CarOutlined,
  CompassOutlined,
  DashboardOutlined,
  FileImageOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

const estilo = { fontSize: "20px" };

export const Modulos = [
  {
    orden: 0,
    key: "Inicio",
    modulo: "inicio",
    ruta: "Inicio",
    descripcion: "Inicio",
    icono: <DashboardOutlined style={estilo} />,
    subMenu: false,
  },
  {
    orden: 1,
    key: "Monitoreo",
    modulo: "monitoreo",
    ruta: "Monitoreo",
    descripcion: "Monitoreo",
    icono: <SearchOutlined style={estilo} />,
    subMenu: false,
  },
  {
    orden: 2,
    key: "Evidencias",
    modulo: "evidencias",
    ruta: "Evidencias",
    descripcion: "Evidencias",
    icono: <FileImageOutlined style={estilo} />,
    subMenu: false,
  },
  {
    orden: 3,
    key: "Folios",
    modulo: "folios",
    ruta: "Folios",
    descripcion: "Folios",
    icono: <CompassOutlined style={estilo} />,
    subMenu: false,
  },
  {
    orden: 4,
    key: "Usuarios",
    modulo: "usuarios",
    ruta: "Usuarios",
    descripcion: "Usuarios",
    icono: <UserOutlined style={estilo} />,
    subMenu: false,
  },
  {
    orden: 5,
    key: "Vehiculos",
    modulo: "vehiculos",
    ruta: "Vehiculos",
    descripcion: "Vehiculos",
    icono: <CarOutlined style={estilo} />,
    subMenu: false,
  },
];
