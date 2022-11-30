import { Usuarios } from "../constants/EndPoints";
import { httpClient } from "../util/Api";

const getAll = async (limit, offset, busqueda = "") => {
  return await httpClient.get(
    `${Usuarios.getAll}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
};

const getRepartidores = async (limit, offset, busqueda = "") => {
  return await httpClient.get(
    `${Usuarios.getRepartidores}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
};

const create = async (body) => {
  return await httpClient.post(Usuarios.create, body);
};

const getOne = async (id) => {
  return await httpClient.get(Usuarios.getOne + id);
};

const login = async (data) => {
  return await httpClient.post(Usuarios.login, data);
};

const getToken = async (token) => {
  return await httpClient.get(Usuarios.getToken + "?token=" + token);
};

const update = async (id, body) => {
  return await httpClient.put(Usuarios.update + id, body);
};

const _delete = async (id) => {
  return await httpClient.delete(Usuarios.delete + id);
};

export const usuariosService = {
  getAll,
  getRepartidores,
  create,
  getOne,
  login,
  getToken,
  update,
  delete: _delete,
};
