import http from "../http-common";

const gameBaseUrl = '/games'

const getAll = () => {
  return http.get(`${gameBaseUrl}`);
};

const get = id => {
  return http.get(`${gameBaseUrl}/${id}`);
};

const create = data => {
  return http.post(`${gameBaseUrl}`, data);
};

const update = (id, data) => {
  return http.put(`${gameBaseUrl}/${id}`, data);
};

const remove = id => {
  return http.delete(`${gameBaseUrl}/${id}`);
};

const removeAll = () => {
  return http.delete(`${gameBaseUrl}`);
};

const findByTitle = title => {
  return http.get(`${gameBaseUrl}?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};