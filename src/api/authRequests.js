import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL});

export const register = (formData) => API.post(`/auth/signup`, formData);

export const login = (formData) => API.post(`/auth/login`, formData);