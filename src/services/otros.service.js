import { Otros } from "../constants/EndPoints";
import { httpClient } from "../util/Api";

const getAll = async (limit, offset, busqueda = "") => {
  const response = await httpClient.get(
    `${Otros.Roles.getAll}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
  return response;
};

const create = async (body) => {
  const response = await httpClient.post(Otros.Roles.create, body);
  return response;
};

const getOne = async (id) => {
  const response = await httpClient.get(Otros.Roles.getOne + id);
  return response;
};

const update = async (id, body) => {
  const response = await httpClient.put(Otros.Roles.update + id, body);
  return response;
};

const _delete = async (id) => {
  const response = await httpClient.delete(Otros.Roles.delete + id);
  return response;
};

export const otrosService = {
  getAll,
  create,
  getOne,
  update,
  delete: _delete,
};
