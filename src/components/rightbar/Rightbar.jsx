import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Rightbar.css";
import { AppContext } from "../../context/AppContext";
import Online from "../online/Online";

export default function Rightbar({ profile, user }) {
  const { users, addMember } = useContext(AppContext);
  const [memberName, setMemberName] = useState("");

  const handleAddMember = (e) => {
    e.preventDefault();
    if (memberName.trim()) {
      // Pick a random profile picture index between 1 and 10
      const randomPicIndex = Math.floor(Math.random() * 10) + 1;
      const randomPicPath = `/assets/person/${randomPicIndex}.jpeg`;
      addMember(memberName, randomPicPath);
      setMemberName("");
    }
  };

  const AddMemberSection = () => {
    return (
      <div className="addMemberContainer">
        <h5 className="addMemberTitle">Add New Member</h5>
        <form onSubmit={handleAddMember} className="addMemberForm">
          <input
            type="text"
            className="addMemberInput"
            placeholder="Enter friend's name..."
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          <button type="submit" className="addMemberButton">
            <i className="fa fa-user-plus"></i> Add
          </button>
        </form>
      </div>
    );
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city || "New York"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from || "Madrid"}</span>
          </div>
          {user?.address && (
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Address:</span>
              <span className="rightbarInfoValue">{user.address}</span>
            </div>
          )}
          {user?.phone && (
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Phone:</span>
              <span className="rightbarInfoValue">{user.phone}</span>
            </div>
          )}
          {user?.email && (
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Email:</span>
              <span className="rightbarInfoValue">{user.email}</span>
            </div>
          )}
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user?.relationship || "Single"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {users.slice(0, 6).map((u) => {
            const cleanPic = u.profilePicture 
              ? (u.profilePicture.startsWith('/') ? u.profilePicture : '/' + u.profilePicture) 
              : '/assets/person/noAvatar.png';
            return (
              <Link 
                key={u.id} 
                to={`/profile/${u.username}`} 
                style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={cleanPic}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName" style={{ fontSize: '12px', marginTop: '5px' }}>{u.username}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <AddMemberSection />
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}