import React from 'react'
import profileImg from "../../img/defaultProfile.png"

import "./Users.css"
import { useInfoContext } from '../../context/Context'
import { findChat } from '../../api/chatRequests'

export const Users = ({users}) => {
  const {onlineUsers, currentUser, setCurrentChat, setUser, setModal, chats, setChats, exit} = useInfoContext()

  const createChat = async (firstId, secondId) => {
    try {
      const {data} = await findChat(firstId, secondId)
      setCurrentChat(data)
      if(!chats.some(chat => chat._id === data._id)) {
        setChats([...chats, data])
      }
    } catch (error) {
      console.log(error);
      if(error.response.data.message === "jwt expired") {
        exit()
      }
    }
  }

  const online = (user) => {
    return onlineUsers.some(onlineUser => onlineUser.userId === user._id)
  }

  const openModal = (user) => {
    setModal(true)
    setUser(user)
  }

  return (
    <div className='users-list'>
      {
        users.map(user => {
          return (
            <div key={user._id}> 
              <div className="conversation user-info-box">
                <div onClick={()=> openModal(user)}>
                  {
                    online(user) && <div className="online-dot"></div>
                  }
                  <img src={user.profilePicture ? user.profilePicture.url : profileImg} alt="profile_img" className="profile-img" />
                  <div className="name">
                    <span>{user.firstname} {user.lastname}</span>
                    <span className="status">{online(user) ? "online" : "offline"}</span>
                  </div>
                </div>

                <button onClick={()=> createChat(user._id, currentUser._id)} className="button"></button>
              </div>
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}
