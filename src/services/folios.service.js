import { Folios } from "../constants/EndPoints";
import { httpClient } from "../util/Api";

const getAll = async (limit, offset, busqueda = "") => {
  const response = await httpClient.get(
    `${Folios.getAll}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
  return response;
};

const create = async (body) => {
  const response = await httpClient.post(Folios.create, body);
  return response;
};

const getOne = async (id) => {
  const response = await httpClient.get(Folios.getOne + id);
  return response;
};

const update = async (id, body) => {
  const response = await httpClient.put(Folios.update + id, body);
  return response;
};

const _delete = async (id) => {
  const response = await httpClient.delete(Folios.delete + id);
  return response;
};

export const foliosService = {
  getAll,
  create,
  getOne,
  update,
  delete: _delete,
};
