import React from 'react'
import profileImage from "../../img/defaultProfile.png"
import coverImg from "../../img/defaultCover.jpg"
import { useInfoContext } from '../../context/Context'

import "./EditModal.css"
import { updateUser } from '../../api/userRequests'
import { useState } from 'react'

export const EditModal = () => {

  const {currentUser, setCurrentUser, setEditModal, exit} = useInfoContext()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const formData = new FormData(e.target)

      const {data} = await updateUser(currentUser._id, formData)

      setCurrentUser(data)

      localStorage.setItem("profile", JSON.stringify(data))
      setLoading(false)
      
    } catch (error) {
      console.log(error);
      if(error.response.data.message === "jwt expired") {
        exit()
      }
      setLoading(false)
    }
  }

  return (
    <div className='info-modal'>
      <button onClick={()=> setEditModal(false)} className="button close-btn">X</button>

      <div className="info-card">
        <div className="modal-profile-img">
          <img className='cover-img' src={currentUser?.coverPicture ? currentUser.coverPicture.url : coverImg} alt="cover_picture" />
          <img src={currentUser?.profilePicture ? currentUser.profilePicture.url : profileImage} alt="profile_image" />
        </div>
        
        <form onSubmit={handleSubmit} className="info-form edit-form">
          <div>
            <input type="text" className="info-input" name='firstname' defaultValue={currentUser.firstname} placeholder='First Name' />

            <input type="text" className="info-input" name='lastname' defaultValue={currentUser.lastname} placeholder='Last Name' />
          </div>

          <div>
            <input type="text" className="info-input" name='worksAt' defaultValue={currentUser.worksAt} placeholder='Works At' />
          </div>

          <div>
            <input type="text" className="info-input" name='livesIn' defaultValue={currentUser.livesIn} placeholder='Lives In' />
            <input type="text" className="info-input" name='country' defaultValue={currentUser.country} placeholder='Country' />
          </div>

          <div>
            <input type="text" className="info-input" name='relationship' defaultValue={currentUser.relationship} placeholder='Relationship' />
          </div>

          <div>
            <label htmlFor="">
              Profile Image
              <input type="file" name='profilePicture' />
            </label>
            <label htmlFor="">
              Cover Image
              <input type="file" name='coverPicture' />
            </label>
          </div>

          <button disabled={loading} type='submit' className="button info-btn">{loading ? "Please Wait..." : "Update"}</button>
        </form>

      </div>
    </div>
  )
}
