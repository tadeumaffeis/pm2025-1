
import axios from 'axios';

const baseUrl = 'http://localhost:3000/instituicao';

export const getInstituicoes = (db) => axios.get(`${baseUrl}/${db}`);
export const createInstituicao = (db, data) => axios.post(`${baseUrl}/${db}`, data);
export const updateInstituicao = (db, id, data) => axios.put(`${baseUrl}/${db}/${id}`, data);
export const deleteInstituicao = (db, id) => axios.delete(`${baseUrl}/${db}/${id}`);
