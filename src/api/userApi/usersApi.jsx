import axios from 'axios';

const API = 'http://10.1.1.89:8200';

// CRUD usuarios
export const getUsersRequest = () => axios.get(`${API}/users`);
export const getUserByIdRequest = (id) => axios.get(`${API}/userById/${id}`);
export const createUserRequest = (user) => axios.post(`${API}/users`, user);
export const updateUserRequest = (id, user) => axios.put(`${API}/usersUpdate/${id}`, user);
export const deleteUserRequest = (id) => axios.delete(`${API}/users/${id}`);
export const getPaginatedUsersRequest = (page = 1, perPage = 10) =>
  axios.get(`${API}/users_paginated?page=${page}&per_page=${perPage}`);
export const searchUsersRequest = (query) =>
  axios.get(`${API}/users_search?query=${encodeURIComponent(query)}`);


export const loginRoute = (str_name_user, str_password) => {
  console.log('🚀 POST a:', `${API}/login`, { str_name_user, str_password });
  return axios.post(`${API}/login`, { str_name_user, str_password });
};
