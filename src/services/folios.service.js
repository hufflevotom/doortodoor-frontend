import { Folios } from "../constants/EndPoints";
import { httpClient } from "../util/Api";

const getAll = async (limit, offset, busqueda = "", criterio) => {
  return await httpClient.get(
    `${Folios.getAll}?limit=${limit}&offset=${offset}${
      busqueda && criterio && busqueda !== "" && criterio !== ""
        ? `&criterio=${criterio}&busqueda=${busqueda}`
        : ""
    }`
  );
};

const create = async (body) => {
  return await httpClient.post(Folios.create, body);
};

const cargarFolios = async (body) => {
  return httpClient.post(Folios.cargarFolios, JSON.parse(body));
};

const getOne = async (id) => {
  return await httpClient.get(Folios.getOne + id);
};

const getMany = async (body) => {
  return await httpClient.post(Folios.getMany, body);
};

const getRutas = async () => {
  return await httpClient.get(Folios.getRutas);
};

const validarEstadoCarga = async () => {
  return await httpClient.get(Folios.validarEstadoCarga);
};

const update = async (id, body) => {
  return await httpClient.put(Folios.update + id, body);
};

const _delete = async (id) => {
  return await httpClient.delete(Folios.delete + id);
};

export const foliosService = {
  getAll,
  create,
  cargarFolios,
  getOne,
  getMany,
  getRutas,
  validarEstadoCarga,
  update,
  delete: _delete,
};
