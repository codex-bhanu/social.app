import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import './Post.css';

const Post = (props) => {  
    const { 
        users, 
        bookmarkedPostIds, 
        toggleBookmark, 
        postReactions, 
        addReaction, 
        deletePost,
        toggleJoinPlan
    } = useContext(AppContext);

    const [like] = useState(props.post.like);
    const [showReactions, setShowReactions] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // Get current post reactions
    const currentReacts = postReactions[props.post.id] || [];
    const myReact = currentReacts.find(r => r.userId === 999);
    
    // Total reactions count is initial count + new reactions
    const totalReactsCount = like + currentReacts.length;

    const handleReactClick = (type) => {
        addReaction(props.post.id, 999, type);
        setShowReactions(false);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(props.post.id);
        }
        setShowMenu(false);
    };

    const postUser = users.find((u) => u.id === props.post.userId) || {
        id: 999,
        username: "Bhanu Pratap Yadav",
        profilePicture: "/assets/person/bhanu.jpg"
    };

    const cleanPic = postUser.profilePicture.startsWith('/') 
        ? postUser.profilePicture 
        : '/' + postUser.profilePicture;

    const isBookmarked = bookmarkedPostIds ? bookmarkedPostIds.includes(props.post.id) : false;
 
  return (
    <>
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={cleanPic} alt="" className="postProfileImg" />
                    <span className="postUsername">
                        <strong>{postUser.username}</strong>
                        {props.post.feeling && <span className="postMeta"> is feeling {props.post.feeling}</span>}
                        {props.post.tags && props.post.tags.length > 0 && (
                            <span className="postMeta"> with <strong>{props.post.tags.join(", ")}</strong></span>
                        )}
                        {props.post.location && <span className="postMeta"> in <strong>{props.post.location}</strong></span>}
                    </span>
                    <span className="postDate">{props.post.date}</span>
                </div>
                
                <div className="postTopRightContainer">
                    <div className="postTopRight" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <i 
                          className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark`} 
                          style={{ cursor: 'pointer', color: isBookmarked ? '#3b82f6' : '#94a3b8', fontSize: '15px' }}
                          onClick={() => toggleBookmark(props.post.id)}
                        ></i>
                        <i 
                          className="fa fa-ellipsis-v" 
                          style={{ cursor: 'pointer', color: '#64748b' }}
                          onClick={() => setShowMenu(!showMenu)}
                        ></i>
                    </div>
                    
                    {showMenu && (
                      <div className="postMenuDropdown">
                        {props.post.userId === 999 ? (
                          <div className="postMenuItem delete" onClick={handleDelete}>
                            <i className="fa fa-trash-alt"></i> Delete Post
                          </div>
                        ) : (
                          <div className="postMenuItem report" onClick={() => { alert("Post reported!"); setShowMenu(false); }}>
                            <i className="fa fa-flag"></i> Report Post
                          </div>
                        )}
                      </div>
                    )}
                </div>
             </div>

             <div className="postCenter">
                <span className="postText">{props.post.desc}</span>
                {props.post.photo && <img src={props.post.photo.startsWith('/') ? props.post.photo : '/' + props.post.photo} alt="" className="postImg" />}
                
                {props.post.isPlan && (
                  <div className="postPlanCard" style={{ margin: '14px 0', padding: '16px', background: 'var(--hover-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-heading)', fontWeight: '800' }}>
                        📅 {props.post.planTitle}
                      </h4>
                      <span style={{ fontSize: '10px', background: '#e0e7ff', color: '#4f46e5', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
                        Plan Activity
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                      <span><i className="fa fa-clock"></i> Date: {props.post.planDate}</span>
                      <span><i className="fa fa-map-marker-alt"></i> Location: {props.post.planLocation}</span>
                      <span><i className="fa fa-users"></i> Capacity: {(props.post.planAttendees || []).length} / {props.post.planCapacity}</span>
                    </div>
                    
                    <button 
                      onClick={() => toggleJoinPlan(props.post.id, 999)}
                      style={{
                        width: '100%',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '8px 0',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: (props.post.planAttendees || []).includes(999) ? '#10b981' : '#3b82f6',
                        color: 'white'
                      }}
                    >
                      {(props.post.planAttendees || []).includes(999) ? "✓ Going (Click to leave)" : "Join Plan"}
                    </button>
                  </div>
                )}
             </div>

             <div className="postBottom">
                   <div 
                     className="reactionsContainer"
                     onMouseEnter={() => setShowReactions(true)}
                     onMouseLeave={() => setShowReactions(false)}
                   >
                     {showReactions && (
                       <div className="reactionsPopup">
                         <span onClick={() => handleReactClick('like')} title="Like">👍</span>
                         <span onClick={() => handleReactClick('love')} title="Love">❤️</span>
                         <span onClick={() => handleReactClick('haha')} title="Haha">😂</span>
                         <span onClick={() => handleReactClick('angry')} title="Angry">😡</span>
                       </div>
                     )}
                     
                     <div className="postButtonLeft" onClick={() => handleReactClick('like')}>
                       {myReact ? (
                         <span className="activeReaction">
                           {myReact.type === 'like' && "👍 Like"}
                           {myReact.type === 'love' && "❤️ Love"}
                           {myReact.type === 'haha' && "😂 Haha"}
                           {myReact.type === 'angry' && "😡 Angry"}
                         </span>
                       ) : (
                         <>
                           <img className="likeIcon" src="/assets/like.png" alt="" />
                           <img className="likeIcon" src="/assets/heart.png" alt="" />
                           <span className="postLikeCounter" style={{ fontSize: '13.5px', color: '#475569' }}>Like</span>
                         </>
                       )}
                       <span className="postLikeCounter" style={{ marginLeft: '6px', color: '#64748b', fontSize: '13.5px', fontWeight: '600' }}>
                         ({totalReactsCount})
                       </span>
                     </div>
                   </div>

                   <div className="postButtonRight">
                       <span className="postCommentText">{props.post.comment} comments</span>
                   </div>
             </div>
        </div>
    </div>
    </>
  );
};

export default Post;
