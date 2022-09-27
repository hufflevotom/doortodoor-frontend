//* URL de la API
export const backend = process.env.REACT_APP_BACKEND_URL;
//* URL de recursos
export const pathPublic = process.env.REACT_APP_PUBLIC_PATH_URL;

//! Endpoints
//* Módulo de usuarios
export const Usuarios = {
  login: backend + "usuario/sesion",
  getAll: backend + "usuario",
  create: backend + "usuario",
  //   getOne: backend + "usuario/",
  update: backend + "usuario/",
  delete: backend + "usuario/",
};

//* Módulo de vehiculos
export const Vehiculos = {
  getAll: backend + "vehiculo",
  create: backend + "vehiculo",
  //   getOne: backend + "vehiculo/",
  update: backend + "vehiculo/",
  delete: backend + "vehiculo/",
};

//* Módulo de folios
export const Folios = {
  getAll: backend + "folio",
  create: backend + "folio",
  //   getOne: backend + "folio/",
  update: backend + "folio/",
  delete: backend + "folio/",
  getActuales: backend + "folio/obtenerFolios",
  cargarFolios: backend + "folio/cargarFolios",
};

//* Módulo de evidencias
export const Evidencias = {
  getAll: backend + "evidencia",
  create: backend + "evidencia",
  //   getOne: backend + "evidencia/",
  update: backend + "evidencia/",
  delete: backend + "evidencia/",
};
