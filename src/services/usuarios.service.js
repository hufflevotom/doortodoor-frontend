import { Usuarios } from "../constants/EndPoints";
import { httpClient } from "../util/Api";

const getAll = async (limit, offset, busqueda = "") => {
  const response = await httpClient.get(
    `${Usuarios.getAll}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
  return response;
};

const create = async (body) => {
  const response = await httpClient.post(Usuarios.create, body);
  return response;
};

const getOne = async (id) => {
  const response = await httpClient.get(Usuarios.getOne + id);
  return response;
};

const update = async (id, body) => {
  const response = await httpClient.put(Usuarios.update + id, body);
  return response;
};

const _delete = async (id) => {
  const response = await httpClient.delete(Usuarios.delete + id);
  return response;
};

export const usuariosService = {
  getAll,
  create,
  getOne,
  update,
  delete: _delete,
};
