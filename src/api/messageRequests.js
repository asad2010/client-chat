import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL});


export const getMessages = (id)=> {
  const token = localStorage.getItem("token");
  
  return API.get(`/message/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
};

export const addMessage = (data)=> {
  const token = localStorage.getItem("token");
  
  return API.post(`/message`, data, {headers: {"Authorization": `Bearer ${token}`}})
};

export const deleteMessage = (messageId)=> {
  const token = localStorage.getItem("token");
  
  return API.delete(`/message/${messageId}`, {headers: {"Authorization": `Bearer ${token}`}})
};