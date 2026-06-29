import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Feed from '../feed/Feed';
import Post from '../post/Post';
import './TabContent.css';

const TabContent = () => {
  const { 
    activeTab, 
    posts, 
    bookmarkedPostIds, 
    users, 
    groupsList, 
    createGroup, 
    joinGroup, 
    approveGroupMember, 
    eventsList, 
    createEvent, 
    rsvpEvent 
  } = useContext(AppContext);

  // States for Chats tab
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [chatThreads, setChatThreads] = useState({
    1: [
      { id: 1, sender: "Alex Durden", message: "Hey, are we still meeting today?", time: "2 mins ago", isMe: false },
    ],
    2: [
      { id: 1, sender: "Thomas Holden", message: "Check out this awesome video!", time: "1 hour ago", isMe: false }
    ],
    3: [
      { id: 1, sender: "Gary Duty", message: "Thanks for the tips!", time: "3 hours ago", isMe: false }
    ]
  });
  const [chatInput, setChatInput] = useState("");

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "Bhanu Pratap Yadav",
      message: chatInput,
      time: "Just now",
      isMe: true
    };

    setChatThreads(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage]
    }));

    const sentText = chatInput;
    setChatInput("");

    setTimeout(() => {
      const activeUser = users.find(u => u.id === selectedChatId) || { username: "Friend" };
      const autoReply = {
        id: Date.now() + 1,
        sender: activeUser.username,
        message: `Thanks for messaging! I'll read your note: "${sentText}" and get back to you soon.`,
        time: "Just now",
        isMe: false
      };
      setChatThreads(prev => ({
        ...prev,
        [selectedChatId]: [...(prev[selectedChatId] || []), autoReply]
      }));
    }, 1500);
  };

  // Group creation form states
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [groupPrivate, setGroupPrivate] = useState(false);

  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      alert("Group Name is required!");
      return;
    }
    createGroup(groupName, groupDesc, groupPrivate);
    setGroupName("");
    setGroupDesc("");
    setGroupPrivate(false);
    setShowGroupForm(false);
    alert(`Group "${groupName}" created successfully!`);
  };

  // Event creation form states
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLoc, setEventLoc] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventCap, setEventCap] = useState("10");

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      alert("Event Title is required!");
      return;
    }
    if (!eventDate) {
      alert("Event Date is required!");
      return;
    }
    // Validation: Date not in the past
    const selectedDateTime = new Date(eventDate).getTime();
    if (selectedDateTime < Date.now()) {
      alert("Validation Error: Event date cannot be in the past!");
      return;
    }

    createEvent(eventTitle, eventDate, eventLoc, eventDesc, eventCap);
    setEventTitle("");
    setEventDate("");
    setEventLoc("");
    setEventDesc("");
    setEventCap("10");
    setShowEventForm(false);
    alert("Event created and invitations sent!");
  };

  const getGroupStatusText = (group) => {
    const membership = group.members.find(m => m.userId === 999);
    if (!membership) return null;
    return membership.status; // 'pending' or 'approved'
  };

  const getGroupRole = (group) => {
    const membership = group.members.find(m => m.userId === 999);
    if (!membership) return null;
    return membership.role; // 'admin', 'mod', 'member'
  };

  // Accordion questions
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const questionsList = [
    { id: 1, q: "How do I add a new member?", a: "To add a new member, navigate to the Home feed page. Look at the rightmost column (Rightbar), fill in the name in the 'Add New Member' input card, and click 'Add'." },
    { id: 2, q: "How do I upload a photo in my post?", a: "Click on the 'Photo or Video' icon in the Share card. Choose any image from your computer to attach it. You will see a preview thumbnail; type your caption and click 'Share' to publish it." },
    { id: 3, q: "How do I view bookmarked posts?", a: "Click the bookmark icon (top-right of any post card) to bookmark it. Then click the 'Bookmarks' tab in the left sidebar to view all of your saved posts in one place." }
  ];

  // Jobs
  const [appliedJobs, setAppliedJobs] = useState([]);
  const jobsList = [
    { id: 1, title: "Senior React Engineer", company: "TechCorp Ltd", salary: "$120k - $140k", location: "Remote (Global)", type: "Full-Time" },
    { id: 2, title: "UI Designer", company: "Creative Minds", salary: "$85k - $95k", location: "Mumbai, IN", type: "Full-Time" },
    { id: 3, title: "Frontend Intern", company: "Innovate Inc", salary: "$25 / hr", location: "Remote", type: "Internship" }
  ];

  // Courses
  const coursesList = [
    { id: 1, name: "React & Context API Mastery", progress: 75, duration: "8 hours", lessons: "24 lessons", instructor: "Brad Traversy" },
    { id: 2, name: "Advanced CSS Layouts & Animation", progress: 40, duration: "12 hours", lessons: "36 lessons", instructor: "Jonas Schmedtmann" },
    { id: 3, name: "JavaScript Engine Internals", progress: 95, duration: "5 hours", lessons: "15 lessons", instructor: "Kyle Simpson" }
  ];

  // Videos
  const videosList = [
    { id: 1, title: "Creating Premium UI designs in React", views: "1.2k views", duration: "10:14", desc: "A brief walkthrough on designing state-of-the-art landing cards using backdrop filters and CSS grids." },
    { id: 2, title: "React Router v6 Tutorial & Setup", views: "5.4k views", duration: "15:30", desc: "Learn how to configure nested layouts, dynamic param links, and custom tab navigation states." }
  ];

  switch (activeTab) {
    case 'feed':
      return <Feed />;

    case 'chats':
      return (
        <div className="tabContentContainer chatsTab">
          <div className="chatsSidebar">
            <h3 className="tabHeaderTitle">Direct Messages</h3>
            {users.slice(0, 4).map((u) => (
              <div 
                key={u.id}
                className={`chatListItem ${selectedChatId === u.id ? 'active' : ''}`}
                onClick={() => setSelectedChatId(u.id)}
              >
                <img src={u.profilePicture.startsWith('/') ? u.profilePicture : '/' + u.profilePicture} alt="" className="chatListAvatar" />
                <div className="chatListInfo">
                  <span className="chatListName">{u.username}</span>
                  <span className="chatListSnippet">
                    {chatThreads[u.id] ? chatThreads[u.id][chatThreads[u.id].length - 1]?.message : "Click to start chatting..."}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="chatWindow">
            {selectedChatId ? (
              <>
                <div className="chatWindowHeader">
                  <img 
                    src={users.find(u => u.id === selectedChatId)?.profilePicture.startsWith('/') 
                      ? users.find(u => u.id === selectedChatId)?.profilePicture 
                      : '/' + users.find(u => u.id === selectedChatId)?.profilePicture} 
                    alt="" 
                    className="chatListAvatar" 
                  />
                  <h4>{users.find(u => u.id === selectedChatId)?.username}</h4>
                </div>
                <div className="chatMessagesList">
                  {(chatThreads[selectedChatId] || []).map((msg) => (
                    <div key={msg.id} className={`chatMessageRow ${msg.isMe ? 'me' : 'other'}`}>
                      <div className="chatBubble">
                        <p>{msg.message}</p>
                        <span className="chatTime">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <form className="chatInputRow" onSubmit={handleSendChat}>
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={chatInput} 
                    onChange={e => setChatInput(e.target.value)} 
                  />
                  <button type="submit">Send</button>
                </form>
              </>
            ) : (
              <div className="emptyState">Select a conversation to start chat</div>
            )}
          </div>
        </div>
      );

    case 'videos':
      return (
        <div className="tabContentContainer standardTab">
          <h3 className="tabHeaderTitle">Watch Videos</h3>
          <div className="videoGrid">
            {videosList.map((video) => (
              <div key={video.id} className="videoCard">
                <div className="videoPlayerMock">
                  <div className="videoPlayBtn"><i className="fa fa-play"></i></div>
                  <span className="videoDuration">{video.duration}</span>
                </div>
                <div className="videoCardDetails">
                  <h4>{video.title}</h4>
                  <span className="videoCardViews">{video.views} &bull; {video.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'groups':
      return (
        <div className="tabContentContainer standardTab">
          <div className="tabHeaderRow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="tabHeaderTitle" style={{ margin: 0 }}>Groups</h3>
            <button 
              className="groupCreateHeaderBtn"
              style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 16px', fontWeight: '600', cursor: 'pointer' }}
              onClick={() => setShowGroupForm(!showGroupForm)}
            >
              {showGroupForm ? "View Groups" : "Create Group"}
            </button>
          </div>

          {showGroupForm ? (
            <form onSubmit={handleCreateGroupSubmit} className="creationFormCard" style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div className="formField" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Group Name</label>
                <input 
                  type="text" 
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  placeholder="e.g. Photography Lovers"
                  style={{ padding: '10px 14px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                />
              </div>
              <div className="formField" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Description</label>
                <textarea 
                  value={groupDesc}
                  onChange={e => setGroupDesc(e.target.value)}
                  placeholder="What is this group about?"
                  style={{ padding: '10px 14px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
                />
              </div>
              <div className="formFieldCheckbox" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  checked={groupPrivate}
                  onChange={e => setGroupPrivate(e.target.checked)}
                  id="groupPrivate"
                />
                <label htmlFor="groupPrivate" style={{ fontSize: '13.5px', fontWeight: '500', color: '#475569', cursor: 'pointer' }}>
                  Private Group (Requires Admin approval to join)
                </label>
              </div>
              <button type="submit" style={{ backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 0', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                Submit Group
              </button>
            </form>
          ) : (
            <div className="groupsGrid">
              {groupsList.map((group) => {
                const status = getGroupStatusText(group);
                const role = getGroupRole(group);
                const approvedMembers = group.members.filter(m => m.status === 'approved');
                const pendingMembers = group.members.filter(m => m.status === 'pending');

                return (
                  <div key={group.id} className="groupCard">
                    <img src={group.img} alt="" className="groupCardBanner" />
                    <div className="groupCardContent">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ margin: 0 }}>{group.name}</h4>
                        {group.isPrivate && <span style={{ fontSize: '10px', background: '#fee2e2', color: '#ef4444', padding: '2px 6px', borderRadius: '10px', fontWeight: '700' }}>Private</span>}
                      </div>
                      <span className="groupCardMembers" style={{ display: 'block', margin: '4px 0 10px 0' }}>
                        {approvedMembers.length} members
                      </span>
                      <p>{group.desc}</p>

                      {status === 'approved' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{ fontSize: '12px', background: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '8px', fontWeight: '700', textAlign: 'center' }}>
                            ✓ Joined ({role})
                          </span>
                          
                          {/* Admin Approval panel */}
                          {role === 'admin' && pendingMembers.length > 0 && (
                            <div className="pendingApprovalsPanel" style={{ background: '#fef3c7', padding: '10px', borderRadius: '8px', border: '1px solid #fde68a', marginTop: '10px' }}>
                              <h5 style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#b45309' }}>Join Requests:</h5>
                              {pendingMembers.map((m) => {
                                const requester = users.find(u => u.id === m.userId) || { username: "Pending User" };
                                return (
                                  <div key={m.userId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', marginBottom: '6px' }}>
                                    <span>{requester.username}</span>
                                    <button 
                                      onClick={() => approveGroupMember(group.id, m.userId)}
                                      style={{ background: '#10b981', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', fontWeight: '700' }}
                                    >
                                      Approve
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : status === 'pending' ? (
                        <span style={{ fontSize: '12px', background: '#fef3c7', color: '#d97706', padding: '8px 0', borderRadius: '20px', fontWeight: '700', textAlign: 'center' }}>
                          ⌛ Pending Admin Approval
                        </span>
                      ) : (
                        <button 
                          className="groupJoinBtn"
                          onClick={() => joinGroup(group.id, 999)}
                        >
                          Join Group
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );

    case 'bookmarks':
      const bookmarkedPosts = posts.filter(p => bookmarkedPostIds.includes(p.id));
      return (
        <div className="tabContentContainer standardTab">
          <h3 className="tabHeaderTitle">Your Bookmarks</h3>
          {bookmarkedPosts.length === 0 ? (
            <div className="emptyState">
              <i className="fa fa-bookmark emptyIcon"></i>
              <p>No bookmarked posts yet.</p>
              <span>Click the bookmark icon on feed posts to save them here.</span>
            </div>
          ) : (
            <div className="bookmarksList" style={{ width: '100%' }}>
              {bookmarkedPosts.map(post => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      );

    case 'questions':
      return (
        <div className="tabContentContainer standardTab">
          <h3 className="tabHeaderTitle">Questions & Answers</h3>
          <div className="faqList">
            {questionsList.map((q) => (
              <div key={q.id} className="faqItemCard">
                <div 
                  className="faqQuestionHeader" 
                  onClick={() => setOpenQuestionId(openQuestionId === q.id ? null : q.id)}
                >
                  <h4>{q.q}</h4>
                  <i className={`fa ${openQuestionId === q.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </div>
                {openQuestionId === q.id && (
                  <div className="faqAnswerBody">
                    <p>{q.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case 'jobs':
      return (
        <div className="tabContentContainer standardTab">
          <h3 className="tabHeaderTitle">Jobs Board</h3>
          <div className="jobsGrid">
            {jobsList.map((job) => (
              <div key={job.id} className="jobCard">
                <div className="jobHeader">
                  <h4>{job.title}</h4>
                  <span className="jobTypeBadge">{job.type}</span>
                </div>
                <span className="jobCompany">{job.company}</span>
                <div className="jobMetaInfo">
                  <span><i className="fa fa-map-marker-alt"></i> {job.location}</span>
                  <span><i className="fa fa-money-bill-wave"></i> {job.salary}</span>
                </div>
                <button 
                  className={`jobApplyBtn ${appliedJobs.includes(job.id) ? 'applied' : ''}`}
                  onClick={() => setAppliedJobs(prev => prev.includes(job.id) ? prev : [...prev, job.id])}
                >
                  {appliedJobs.includes(job.id) ? '✓ Applied' : 'Apply Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'events':
      return (
        <div className="tabContentContainer standardTab">
          <div className="tabHeaderRow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="tabHeaderTitle" style={{ margin: 0 }}>Events</h3>
            <button 
              className="groupCreateHeaderBtn"
              style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 16px', fontWeight: '600', cursor: 'pointer' }}
              onClick={() => setShowEventForm(!showEventForm)}
            >
              {showEventForm ? "View Events" : "Create Event"}
            </button>
          </div>

          {showEventForm ? (
            <form onSubmit={handleCreateEventSubmit} className="creationFormCard" style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div className="formField" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Event Title</label>
                <input 
                  type="text" 
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  placeholder="e.g. Tech Innovators Summit"
                  style={{ padding: '10px 14px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div className="formField" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Date</label>
                  <input 
                    type="date" 
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    style={{ padding: '10px 14px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                  />
                </div>
                <div className="formField" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Max Capacity</label>
                  <input 
                    type="number" 
                    min="1"
                    value={eventCap}
                    onChange={e => setEventCap(e.target.value)}
                    style={{ padding: '10px 14px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                  />
                </div>
              </div>
              <div className="formField" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Location</label>
                <input 
                  type="text" 
                  value={eventLoc}
                  onChange={e => setEventLoc(e.target.value)}
                  placeholder="e.g. Grand Plaza Hub"
                  style={{ padding: '10px 14px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                />
              </div>
              <div className="formField" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Description</label>
                <textarea 
                  value={eventDesc}
                  onChange={e => setEventDesc(e.target.value)}
                  placeholder="Tell people what the event is about..."
                  style={{ padding: '10px 14px', border: '1.5px solid #cbd5e1', borderRadius: '8px', outline: 'none', minHeight: '60px', fontFamily: 'inherit' }}
                />
              </div>
              <button type="submit" style={{ backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 0', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                Submit Event
              </button>
            </form>
          ) : (
            <div className="eventsGrid">
              {eventsList.map((event) => {
                const goingCount = event.attendees.filter(a => a.status === 'going').length;
                const myRsvp = event.attendees.find(a => a.userId === 999);
                const isFull = goingCount >= event.capacity;

                return (
                  <div key={event.id} className="eventCard">
                    <div className="eventDateBox">
                      <span className="eventDateText">
                        {event.date.split('-')[1] ? `Month ${event.date.split('-')[1]}` : "Event"}
                        <br/>
                        {event.date.split('-')[2] || "Date"}
                      </span>
                    </div>
                    <div className="eventDetails">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ margin: '0 0 4px 0' }}>{event.title}</h4>
                        {isFull && <span style={{ fontSize: '9px', background: '#fee2e2', color: '#ef4444', padding: '2px 6px', borderRadius: '10px', fontWeight: '700' }}>FULL</span>}
                      </div>
                      <span className="eventLoc"><i className="fa fa-map-marker-alt"></i> {event.location} &bull; Capacity: {event.capacity} seats</span>
                      <p>{event.desc}</p>
                      <div className="eventFooter" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'stretch' }}>
                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                          Going: {goingCount} / {event.capacity} &bull; Maybe: {event.attendees.filter(a => a.status === 'maybe').length}
                        </span>
                        
                        <div className="rsvpButtonGroup" style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className={`eventRsvpBtn ${myRsvp?.status === 'going' ? 'going' : ''}`}
                            style={{ flex: 1, padding: '6px 0', border: '1px solid #cbd5e1', borderRadius: '15px', background: myRsvp?.status === 'going' ? '#10b981' : '#ffffff', color: myRsvp?.status === 'going' ? 'white' : '#475569', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                            onClick={() => rsvpEvent(event.id, 999, 'going')}
                          >
                            Going
                          </button>
                          <button 
                            className="eventRsvpBtn"
                            style={{ flex: 1, padding: '6px 0', border: '1px solid #cbd5e1', borderRadius: '15px', background: myRsvp?.status === 'maybe' ? '#f59e0b' : '#ffffff', color: myRsvp?.status === 'maybe' ? 'white' : '#475569', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                            onClick={() => rsvpEvent(event.id, 999, 'maybe')}
                          >
                            Maybe
                          </button>
                          {myRsvp && (
                            <button 
                              className="eventRsvpBtn"
                              style={{ padding: '6px 12px', border: '1px solid #fecaca', borderRadius: '15px', background: '#fef2f2', color: '#ef4444', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                              onClick={() => rsvpEvent(event.id, 999, 'not_going')}
                            >
                              Leave
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );

    case 'courses':
      return (
        <div className="tabContentContainer standardTab">
          <h3 className="tabHeaderTitle">My E-Learning Courses</h3>
          <div className="coursesGrid">
            {coursesList.map((course) => (
              <div key={course.id} className="courseCard">
                <div className="courseHeader">
                  <h4>{course.name}</h4>
                  <span className="instructorName">By {course.instructor}</span>
                </div>
                <div className="courseMeta">
                  <span><i className="fa fa-clock"></i> {course.duration}</span>
                  <span><i className="fa fa-book-open"></i> {course.lessons}</span>
                </div>
                <div className="courseProgressContainer">
                  <div className="courseProgressHeader">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="progressBarOutline">
                    <div className="progressBarFill" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
                <button className="courseContinueBtn">Continue Course</button>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <Feed />;
  }
};

export default TabContent;
