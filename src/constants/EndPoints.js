//* URL de la API
export const backend = process.env.REACT_APP_BACKEND_URL;
//* URL de recursos
export const pathPublic = process.env.REACT_APP_PUBLIC_PATH_URL;

//! Endpoints
//* Módulo de usuarios
export const Usuarios = {
  login: backend + "auth/login",
  getToken: backend + "auth/login/token",
  getAll: backend + "auth/usuarios",
  create: backend + "auth/usuarios",
  getOne: backend + "auth/usuarios/",
  update: backend + "auth/usuarios/",
  delete: backend + "auth/usuarios/",
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
  create: backend + "document/folios",
  getOne: backend + "document/folios/",
  update: backend + "document/folios/",
  delete: backend + "document/folios/",
  getActuales: backend + "document/folios/obtenerFolios",
  cargarFolios: backend + "document/folios/insertMany",
};

//* Módulo de evidencias
export const Evidencias = {
  getAll: backend + "document/evidencia",
  create: backend + "document/evidencia",
  getOne: backend + "document/evidencia/",
  update: backend + "document/evidencia/",
  delete: backend + "document/evidencia/",
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
};
