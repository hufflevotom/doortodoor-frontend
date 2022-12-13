//* URL de la API
export const backend = process.env.REACT_APP_BACKEND_URL;
//* URL de recursos
export const pathPublic = process.env.REACT_APP_PUBLIC_PATH_URL;

//! Endpoints
//* Módulo de usuarios
export const Usuarios = {
  login: backend + "auth/login",
  getAll: backend + "auth/usuarios",
  create: backend + "auth/usuarios",
  getOne: backend + "auth/usuarios/",
  update: backend + "auth/usuarios/",
  delete: backend + "auth/usuarios/",
  getToken: backend + "auth/login/token",
  getRepartidores: backend + "auth/usuarios/repartidores",
};

//* Módulo de vehiculos
export const Vehiculos = {
  getAll: backend + "transport/vehiculos",
  create: backend + "transport/vehiculos",
  getOne: backend + "transport/vehiculos/",
  update: backend + "transport/vehiculos/",
  delete: backend + "transport/vehiculos/",
};

//* Módulo de folios
export const Folios = {
  getAll: backend + "document/folios",
  getAllByDate: backend + "document/folios/fecha/",
  create: backend + "document/folios",
  getOne: backend + "document/folios/",
  getMany: backend + "document/folios/multiples",
  update: backend + "document/folios/",
  delete: backend + "document/folios/",
  getRutas: backend + "document/folios/rutas",
  cargarFolios: backend + "document/folios/insertMany",
  getActuales: backend + "document/folios/obtenerFolios",
  validarEstadoCarga: backend + "document/folios/validarEstadoCarga",
};

//* Módulo de evidencias
export const Evidencias = {
  getAll: backend + "document/evidencias",
  create: backend + "document/evidencias",
  getOne: backend + "document/evidencias/",
  getOneByFolioAndResponsable: backend + "document/evidencias/delivery",
  update: backend + "document/evidencias/",
  delete: backend + "document/evidencias/",
};

//* Otros
export const Otros = {
  Roles: {
    getAll: backend + "auth/roles",
    create: backend + "auth/roles",
    getOne: backend + "auth/roles/",
    update: backend + "auth/roles/",
    delete: backend + "auth/roles/",
  },
  Estado: {
    getAll: backend + "transport/estadoVehiculo",
    create: backend + "transport/estadoVehiculo",
    getOne: backend + "transport/estadoVehiculo/",
    update: backend + "transport/estadoVehiculo/",
    delete: backend + "transport/estadoVehiculo/",
  },
  Responsables: {
    getAll: backend + "transport/responsables",
    getAllByDate: backend + "transport/responsables/fecha/",
    create: backend + "transport/responsables",
    getOne: backend + "transport/responsables/",
    update: backend + "transport/responsables/",
    delete: backend + "transport/responsables/",
    insertMany: backend + "transport/responsables/insertMany",
  },
};
