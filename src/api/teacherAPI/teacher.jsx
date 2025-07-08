import axios from 'axios';

const API = 'http://10.1.1.89:8200';


export const createTeacherRequest = (teacher) => axios.post(`${API}/create`, teacher);

export const updateTeacherRequest = (id, teacher) => axios.put(`${API}/${id}`, teacher);

export const deleteTeacherRequest = (id) => axios.delete(`${API}/${id}`);

export const getTeacherRequest = (id) => axios.get(`${API}`);

export const getTeacherByIdRequest = (id) => axios.get(`${API}/${id}`);

export const toggleTeacherStatusRequest = (id, state) => axios.patch(`${API}/${id}/toggle`, { state });