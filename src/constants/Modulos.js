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
    key: "1-inicio",
    modulo: "inicio",
    ruta: "Inicio",
    descripcion: "Inicio",
    icono: <DashboardOutlined style={estilo} />,
    subMenu: false,
  },
  {
    key: "2-monitoreo",
    modulo: "monitoreo",
    ruta: "Monitoreo",
    descripcion: "Monitoreo",
    icono: <SearchOutlined style={estilo} />,
    subMenu: false,
  },
  {
    key: "3-evidencias",
    modulo: "evidencias",
    ruta: "Evidencias",
    descripcion: "Evidencias",
    icono: <FileImageOutlined style={estilo} />,
    subMenu: false,
  },
  {
    key: "4-folios",
    modulo: "folios",
    ruta: "Folios",
    descripcion: "Folios",
    icono: <CompassOutlined style={estilo} />,
    subMenu: false,
  },
  {
    key: "5-usuarios",
    modulo: "usuarios",
    ruta: "Usuarios",
    descripcion: "Usuarios",
    icono: <UserOutlined style={estilo} />,
    subMenu: false,
  },
  {
    key: "6-vehiculos",
    modulo: "vehiculos",
    ruta: "Vehiculos",
    descripcion: "Vehiculos",
    icono: <CarOutlined style={estilo} />,
    subMenu: false,
  },
  //   {
  //     key: "6-configuracion",
  //     modulo: "configuracion",
  //     ruta: "Configuracion",
  //     descripcion: "Configuración",
  //     icono: "icon-setting",
  //     subMenu: true,
  //     hijos: [
  //       {
  //         key: "1-metodosPago",
  //         modulo: "metodosPago",
  //         ruta: "Configuracion/MetodosPago",
  //         descripcion: "Métodos de Pago",
  //         icono: "icon-card",
  //         subMenu: false,
  //       },
  //     ],
  //   },
];
