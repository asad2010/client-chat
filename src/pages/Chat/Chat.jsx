import React, { useState } from 'react'
import { useInfoContext } from '../../context/Context'
import io from "socket.io-client"

import "./Chat.css"
import { Search } from '../../components/Search/Search'
import { useEffect } from 'react'
import { InfoModal } from '../../components/InfoModal/InfoModal'
import { ChatBox } from '../../components/ChatBox/ChatBox'
import {Conversation} from '../../components/Conversation/Conversation'
import { userChats } from '../../api/chatRequests'
import { EditModal } from '../../components/EditModal/EditModal'

const socket = io.connect(`https://nodejs2chatserver-production.up.railway.app/`)

export const Chat = () => {

  const {currentUser, onlineUsers, setOnlineUsers, modal, editModal, setEditModal, exit, setCurrentChat, chats, setChats } = useInfoContext()

  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)

  // Get the chat in the sections

  useEffect(()=> {
    const getChats = async () => {
      try {
        const {data} = await userChats()
        setChats(data)
      } catch (error) {
        console.log(error);
        if(error.response.data.message === "jwt expired") {
          exit()
        }
      }
    }

    getChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id])

  useEffect(()=> {
    socket.emit("new-user-add", currentUser._id)

    socket.on('get-users', (users)=> {
      setOnlineUsers(users)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  // send message to socket server
  useEffect(() => {
    if(sendMessage !== null) {
      socket.emit("send-message", sendMessage)
    }
  }, [sendMessage])

  // Get the message from socket server

  useEffect(()=> {
    socket.on("recieve-message", (data) => {
      setReceivedMessage(data)
    })
  }, [])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find(member => member !== currentUser._id)

    const online = onlineUsers.find(user => user.userId === chatMember)

    return online ? true : false
  }

  return (
    <div className='Chat'>
      <div className="left-side">
        <Search />

      </div>

      <div className="middle-box">
        <ChatBox setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>

      </div>

      <div className="right-side">
        <div className="right-side-top">
          <h2>List Chats</h2>
          <button onClick={()=> setEditModal(true)} className="settings-btn button">S</button>
          <button onClick={exit} className="exit-btn"></button>
        </div>
        <div className="chat-list">
          {
            chats.map((chat) => {
              return(
                <div key={chat._id} onClick={()=> setCurrentChat(chat)}>
                  <Conversation data={chat} online={checkOnlineStatus(chat)}/>
                </div>
              )
            })
          }
        </div>
      </div>

      {
        modal && <InfoModal />
      }

      {
        editModal && <EditModal />
      }
    </div>
  )
}
