import { createContext, useContext, useState } from "react";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("profile")) || null);

  const [onlineUsers, setOnlineUsers] = useState([])
  const [user, setUser] = useState(null)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const exit = () => {
    localStorage.clear();
    setCurrentUser(null);
  }

  const value = {
    currentUser, setCurrentUser,
    onlineUsers, setOnlineUsers,
    user, setUser,
    chats, setChats,
    currentChat, setCurrentChat,
    modal, setModal,
    editModal, setEditModal,
    exit,
  }

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>
        {
          ()=>children
        }
      </InfoContext.Consumer>
    </InfoContext.Provider>
  )
}

