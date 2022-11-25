import { Evidencias } from "../constants/EndPoints";
import { httpClient } from "../util/Api";

const getAll = async (limit, offset, busqueda = "") => {
  const response = await httpClient.get(
    `${Evidencias.getAll}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
  return response;
};

const create = async (body) => {
  const response = await httpClient.post(Evidencias.create, body);
  return response;
};

const getOne = async (id) => {
  const response = await httpClient.get(Evidencias.getOne + id);
  return response;
};

const update = async (id, body) => {
  const response = await httpClient.put(Evidencias.update + id, body);
  return response;
};

const _delete = async (id) => {
  const response = await httpClient.delete(Evidencias.delete + id);
  return response;
};

export const evidenciasService = {
  getAll,
  create,
  getOne,
  update,
  delete: _delete,
};
