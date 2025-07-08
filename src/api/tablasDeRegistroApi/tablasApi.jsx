import axios from 'axios';

const API = 'http://10.1.1.89:8200';

// 📦 TABLAS DINÁMICAS - CRUD COMPLETO

// ✅ Obtener todos los nombres de las tablas (sólo nombre)
export const getAllTableNamesRequest = () => axios.get(`${API}/tablas`);

// ✅ Obtener datos completos (nombre + fecha de creación)
export const getTableMetadataRequest = () => axios.get(`${API}/tablas_data`);

// ✅ Obtener columnas de una tabla
export const getTableColumnsRequest = (tableName) =>
  axios.get(`${API}/tablas/${tableName}/columnas`);

// ✅ Crear una tabla dinámica
export const createDynamicTableRequest = (data) =>
  axios.post(`${API}/tablas`, data);

// ✅ Actualizar estructura de tabla (renombrar, añadir, eliminar columnas)
export const updateDynamicTableRequest = (tableName, data) =>
  axios.put(`${API}/tablas/${tableName}`, data);

// ✅ Eliminar una tabla dinámica
export const deleteDynamicTableRequest = (tableName) =>
  axios.delete(`${API}/tablas/${tableName}`);

// ✅ Obtener tablas paginadas
export const getPaginatedTablesRequest = (page = 1, perPage = 5) =>
  axios.get(`${API}/tablas_paginated?page=${page}&per_page=${perPage}`);

// ✅ Buscar tablas por nombre
export const searchTablesRequest = (query) =>
  axios.get(`${API}/tablas_search?query=${encodeURIComponent(query)}`);
