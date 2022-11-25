import { Vehiculos } from "../constants/EndPoints";
import { httpClient } from "../util/Api";

const getAll = async (limit, offset, busqueda = "") => {
  const response = await httpClient.get(
    `${Vehiculos.getAll}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
  return response;
};

const create = async (body) => {
  const response = await httpClient.post(Vehiculos.create, body);
  return response;
};

const getOne = async (id) => {
  const response = await httpClient.get(Vehiculos.getOne + id);
  return response;
};

const update = async (id, body) => {
  const response = await httpClient.put(Vehiculos.update + id, body);
  return response;
};

const _delete = async (id) => {
  const response = await httpClient.delete(Vehiculos.delete + id);
  return response;
};

export const vehiculosService = {
  getAll,
  create,
  getOne,
  update,
  delete: _delete,
};
