import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL});


export const getAllUsers = ()=> {
  const token = localStorage.getItem("token");
  
  return API.get('/user', {headers: {"Authorization": `Bearer ${token}`}})
};

export const getUser = (userId)=> API.get(`/user/${userId}`);

export const updateUser = (id, formData)=> {
  const token = localStorage.getItem("token");
  return API.put(`/user/${id}`, formData, {headers: {"Authorization": `Bearer ${token}`}});
}

export const deleteUser = (id)=> {
  const token = localStorage.getItem("token");
  return API.delete(`/user/${id}`, {headers: {"Authorization": `Bearer ${token}`}});
}

