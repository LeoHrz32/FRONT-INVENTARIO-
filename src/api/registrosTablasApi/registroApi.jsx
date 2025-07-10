import axios from "axios";

const API = "http://10.1.1.89:8200";

// 🔹 Obtener nombres de todas las tablas disponibles
export const getAvailableTablesRequest = () =>
    axios.get(`${API}/registros/tablas-disponibles`);

// 🔹 Obtener todos los registros de una tabla
export const getTableRecordsRequest = (nombreTabla) =>
    axios.get(`${API}/registros/${nombreTabla}`);

// 🔹 Obtener el esquema (columnas) de una tabla
export const getTableColumnsRequest = (nombreTabla) =>
    axios.get(`${API}/registros/${nombreTabla}/columnas`);

// 🔹 Obtener un solo registro por ID
export const getSingleRecordRequest = (nombreTabla, id) =>
    axios.get(`${API}/registros/${nombreTabla}/${id}`);

// 🔹 Crear un nuevo registro
export const createRecordRequest = (nombreTabla, datos) => {
    console.log("📤 Enviando POST a:", `${API}/registros/${nombreTabla}`);
    console.log("📦 Datos que se envían:", datos);
    return axios.post(`${API}/registros/${nombreTabla}`, datos);
};

// 🔹 Actualizar un registro existente
export const updateRecordRequest = (nombreTabla, campoPk, valorPk, datos) =>
    axios.put(`${API}/registros/${nombreTabla}/${campoPk}/${valorPk}`, datos);

// 🔹 Eliminar un registro por ID
export const deleteRecordRequest = (nombreTabla, id) =>
    axios.delete(`${API}/registros/${nombreTabla}/${id}`);


