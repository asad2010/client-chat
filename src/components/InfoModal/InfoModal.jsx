import React from 'react'
import { useInfoContext } from '../../context/Context'
import profileImage from "../../img/defaultProfile.png"
import coverImg from "../../img/defaultCover.jpg"

import "./InfoModal.css"

export const InfoModal = () => {
  const {user, setModal} = useInfoContext()
  return (
    <div className='info-modal'>
      <button onClick={()=> setModal(false)} className="button close-btn">X</button>

      <div className="info-card">
        <div className="modal-profile-img">
          <img className='cover-img' src={user?.coverPicture ? user.coverPicture.url : coverImg} alt="cover_picture" />
          <img src={user?.profilePicture ? user.profilePicture.url : profileImage} alt="profile_image" />
        </div>
        <div className="profile-name">
          <span>{user?.firstname} {user?.lastname}</span>
          <div className="info">
            <span><b>About: {user?.about}</b></span>
          </div>
          <div className="info">
            <span><b>Relationship: {user?.relationship}</b></span>
          </div>
          <div className="info">
            <span><b>Country: {user?.country}</b></span>
          </div>
          <div className="info">
            <span><b>Lives in: {user?.livesIn}</b></span>
          </div>
          <div className="info">
            <span><b>Works At: {user?.worksAt}</b></span>
          </div>
        </div>

      </div>
    </div>
  )
}
