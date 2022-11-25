import { httpClient } from "../util/Api";

const getAll = async (url, limit, offset, busqueda = "") => {
  const response = await httpClient.get(
    `${url}?limit=${limit}&offset=${offset}${
      busqueda && busqueda !== "" ? `&busqueda=${busqueda}` : ""
    }`
  );
  return response;
};

const create = async (url, body) => {
  const response = await httpClient.post(url, body);
  return response;
};

const getOne = async (url, id) => {
  const response = await httpClient.get(url + id);
  return response;
};

const update = async (url, id, body) => {
  const response = await httpClient.put(url + id, body);
  return response;
};

const _delete = async (url, id) => {
  const response = await httpClient.delete(url + id);
  return response;
};

export const otrosService = {
  getAll,
  create,
  getOne,
  update,
  delete: _delete,
};
