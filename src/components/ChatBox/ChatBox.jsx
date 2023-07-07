import React, { useEffect, useRef, useState } from 'react'
import profileImg from "../../img/defaultProfile.png"
import "./ChatBox.css"
import { useInfoContext } from '../../context/Context'
import { getUser } from '../../api/userRequests'
import { addMessage, getMessages } from '../../api/messageRequests'
import { format } from 'timeago.js'
import {UilEllipsisV} from "@iconscout/react-unicons"
import InputEmoji from "react-input-emoji";

export const ChatBox = ({setSendMessage, receivedMessage}) => {
  const {currentUser, exit, setModal, setUser, currentChat} = useInfoContext()

  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const imageRef = useRef()
  const scroll = useRef()

  const userId = currentChat?.members?.find(id => id !== currentUser._id)
  
  useEffect(()=> {    
    const getUserData = async () => {
      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error);
        if(error.response.data.message === "jwt expired") {
          exit()
        }
      }
    }

    if(currentChat) {
      getUserData()
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat, currentUser._id])

  // fetch messages

  useEffect(()=> {
    const fetchMessages = async () => {
      try {
        const {data} = await getMessages(currentChat._id)
        setMessages(data)
      } catch (error) {
        console.log(error);        
      }
    }

    if(currentChat) {
      fetchMessages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat])

  useEffect(()=> {
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  // send Message
  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser._id,
      text: newMessage,
      chatId: currentChat._id,
      createdAt: new Date().getTime()
    }

    if(newMessage === '') {
      return
    }

    const receivedId = currentChat?.members.find(id => id !== currentUser._id)
    setSendMessage({...message, receivedId})

    try {
      const {data} = await addMessage(message)
      setMessages([...messages, data])
      setNewMessage('')
    } catch (error) {
      console.log(error);
      if(error.response.data.message === "jwt expired") {
        exit()
      }
    }
  }

  useEffect(()=> {
    if(currentChat && receivedMessage !== null && receivedMessage?.chatId === currentChat._id) {
      setMessages([...messages, receivedMessage])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMessage])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  const openModal = () => {
    setUser(userData)
    setModal(true)
  }

  return (
    <div className='chatbox-container'>
      {
        currentChat ? (
          <>
            <div className="chat-header">
              <div className="user-info">
                <div onClick={openModal}>
                  <img src={userData?.profilePicture ? userData.profilePicture?.url : profileImg} alt="user_image" className="user-image" />

                  <div className="name">
                    <span>{userData?.firstname} {userData?.lastname}</span>
                  </div>
                </div>
                <button className="chat-menu-btn button">
                  <UilEllipsisV/>
                </button>

              </div>
              <hr />
            </div>

            <div className="chat-body">
              {
                messages.map((message, i) => {
                  return (
                    <div ref={scroll} key={i} className={message.senderId === currentUser._id ? "message own" : "message"}>
                      <span>{message.text}</span>
                      <span>{format(message.createdAt)}</span>
                    </div>
                  )
                })
              }
            </div>

            <div className="chat-sender">
              <div className='chat-sender-file-btn'>+</div>
              <InputEmoji value={newMessage} onChange={handleChange}/>
              <button onClick={handleSend} className='send-button button'>Send</button>
              <input ref={imageRef} type="file" name='messageFile' className='message-file'/>
            </div>

          </>
        ) : 
        <>
          <span className="chatbox-empty-span">Tap on a chat to start conversation...</span>
        </>
      }

    </div>
  )
}
