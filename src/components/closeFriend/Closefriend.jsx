import React from 'react'
import { Link } from 'react-router-dom'
import './Closefriend.css'
const Closefriend = (props) => {
  const cleanProfilePic = props.user.profilePicture 
    ? (props.user.profilePicture.startsWith('/') ? props.user.profilePicture : '/' + props.user.profilePicture) 
    : '/assets/person/noAvatar.png';

  return (
    <Link to={`/profile/${props.user.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <li className="sidebarFriend" style={{ cursor: 'pointer' }}>
        <img src={cleanProfilePic} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{props.user.username}</span>
      </li>
    </Link>
  )
}

export default Closefriend