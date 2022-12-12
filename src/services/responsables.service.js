import { Otros } from "../constants/EndPoints";
import { httpClient } from "../util/Api";

const getAllByDate = async (limit, offset, dateString, busqueda = "") => {
  return await httpClient.get(
    `${
      Otros.Responsables.getAllByDate
    }${dateString}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
};

const getAll = async (limit, offset, busqueda = "") => {
  return await httpClient.get(
    `${Otros.Responsables.getAll}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
};

const create = async (body) => {
  return await httpClient.post(Otros.Responsables.create, body);
};

const insertMany = async (body) => {
  return await httpClient.post(Otros.Responsables.insertMany, body);
};

const getOne = async (id) => {
  return await httpClient.get(Otros.Responsables.getOne + id);
};

const update = async (id, body) => {
  return await httpClient.put(Otros.Responsables.update + id, body);
};

const _delete = async (id) => {
  return await httpClient.delete(Otros.Responsables.delete + id);
};

export const responsablesService = {
  getAll,
  getAllByDate,
  create,
  getOne,
  update,
  delete: _delete,
  insertMany,
};
