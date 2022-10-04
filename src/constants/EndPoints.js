//* URL de la API
export const backend = process.env.REACT_APP_BACKEND_URL;
//* URL de recursos
export const pathPublic = process.env.REACT_APP_PUBLIC_PATH_URL;

//! Endpoints
//* Módulo de usuarios
export const Usuarios = {
  login: backend + "auth/usuario/login",
  getAll: backend + "auth/usuario",
  create: backend + "auth/usuario",
  getOne: backend + "auth/usuario/",
  update: backend + "auth/usuario/",
  delete: backend + "auth/usuario/",
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
  getAll: backend + "document/folio",
  create: backend + "document/folio",
  getOne: backend + "document/folio/",
  update: backend + "document/folio/",
  delete: backend + "document/folio/",
  getActuales: backend + "document/folio/obtenerFolios",
  cargarFolios: backend + "document/folio/cargarFolios",
};

//* Módulo de evidencias
export const Evidencias = {
  getAll: backend + "document/evidencia",
  create: backend + "document/evidencia",
  getOne: backend + "document/evidencia/",
  update: backend + "document/evidencia/",
  delete: backend + "document/evidencia/",
};
