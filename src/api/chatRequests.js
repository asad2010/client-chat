import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL});


export const userChats = ()=> {
  const token = localStorage.getItem("token");
  
  return API.get('/chat', {headers: {"Authorization": `Bearer ${token}`}})
};

export const findChat = (firstId, secondId)=> {
  const token = localStorage.getItem("token");
  
  return API.get(`/chat/${firstId}/${secondId}`, {headers: {"Authorization": `Bearer ${token}`}})
};

export const deleteChat = (chatId)=> {
  const token = localStorage.getItem("token");
  
  return API.delete(`/chat/${chatId}`, {headers: {"Authorization": `Bearer ${token}`}})
};