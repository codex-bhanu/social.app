import React from 'react'
import { Link } from 'react-router-dom'
import './Online.css'
const Online = (props) => {
  const cleanProfilePic = props.user.profilePicture 
    ? (props.user.profilePicture.startsWith('/') ? props.user.profilePicture : '/' + props.user.profilePicture) 
    : '/assets/person/noAvatar.png';

  return (
    <Link to={`/profile/${props.user.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <li className="rightbarFriend" style={{ cursor: 'pointer' }}>
        <div className="rightbarProfileImgContainer">
          <img className="rightbarProfileImg" src={cleanProfilePic} alt="" />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{props.user.username}</span>
      </li>
    </Link>
  )
}

export default Online
