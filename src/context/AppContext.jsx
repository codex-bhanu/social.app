import React, { createContext, useState } from 'react';
import { Users as initialUsers, Posts as initialPosts } from '../Dummydata';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [posts, setPosts] = useState(initialPosts);

  // Unread badge states
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [chatsCount, setChatsCount] = useState(5);
  const [requestsCount, setRequestsCount] = useState(2);

  // Tab & Bookmark States
  const [activeTab, setActiveTab] = useState("feed");
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState([]);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
      return nextTheme;
    });
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPostIds(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  // 1. Stories State & Handlers
  const [storiesList, setStoriesList] = useState([
    { id: 1, userId: 1, mediaUrl: "/assets/post/1.jpeg", expiresAt: Date.now() + 24*60*60*1000, viewers: [2, 3] },
    { id: 2, userId: 2, mediaUrl: "/assets/post/2.jpeg", expiresAt: Date.now() + 24*60*60*1000, viewers: [1] }
  ]);
  const addStory = (mediaUrl) => {
    const newStory = {
      id: storiesList.length + 1,
      userId: 999, // default to logged in user Bhanu
      mediaUrl: mediaUrl,
      expiresAt: Date.now() + 24*60*60*1000,
      viewers: []
    };
    setStoriesList(prev => [newStory, ...prev]);
  };
  const viewStory = (storyId, userId) => {
    setStoriesList(prev => prev.map(s => {
      if (s.id === storyId && !s.viewers.includes(userId)) {
        return { ...s, viewers: [...s.viewers, userId] };
      }
      return s;
    }));
  };

  // 2. Groups State & Handlers
  const [groupsList, setGroupsList] = useState([
    { id: 1, name: "React Developers Hub", desc: "Share React code, tips, and build together.", img: "/assets/post/5.jpeg", isPrivate: false, creatorId: 1, members: [{ userId: 1, role: 'admin', status: 'approved' }, { userId: 999, role: 'member', status: 'approved' }] },
    { id: 2, name: "UI/UX Designers", desc: "Discussion about modern UX, UI patterns, and styling.", img: "/assets/post/3.jpeg", isPrivate: true, creatorId: 2, members: [{ userId: 2, role: 'admin', status: 'approved' }] }
  ]);
  const createGroup = (name, desc, isPrivate) => {
    const newGroup = {
      id: groupsList.length + 1,
      name: name,
      desc: desc,
      img: `/assets/post/${Math.floor(Math.random() * 8) + 1}.jpeg`,
      isPrivate: isPrivate,
      creatorId: 999,
      members: [{ userId: 999, role: 'admin', status: 'approved' }]
    };
    setGroupsList(prev => [...prev, newGroup]);
  };
  const joinGroup = (groupId, userId) => {
    setGroupsList(prev => prev.map(g => {
      if (g.id === groupId) {
        const alreadyIn = g.members.some(m => m.userId === userId);
        if (alreadyIn) return g;
        const status = g.isPrivate ? 'pending' : 'approved';
        return { ...g, members: [...g.members, { userId, role: 'member', status }] };
      }
      return g;
    }));
  };
  const approveGroupMember = (groupId, userId) => {
    setGroupsList(prev => prev.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          members: g.members.map(m => m.userId === userId ? { ...m, status: 'approved' } : m)
        };
      }
      return g;
    }));
  };

  // 3. Reactions State & Handlers
  const [postReactions, setPostReactions] = useState({
    1: [{ userId: 2, type: 'like' }, { userId: 3, type: 'love' }]
  });
  const addReaction = (postId, userId, type) => {
    setPostReactions(prev => {
      const postReacts = prev[postId] || [];
      const existing = postReacts.find(r => r.userId === userId);
      let updatedReacts = [];

      if (existing) {
        if (existing.type === type) {
          updatedReacts = postReacts.filter(r => r.userId !== userId);
        } else {
          updatedReacts = postReacts.map(r => r.userId === userId ? { ...r, type } : r);
        }
      } else {
        updatedReacts = [...postReacts, { userId, type }];
      }

      return { ...prev, [postId]: updatedReacts };
    });
  };

  // 4. Events State & Handlers
  const [eventsList, setEventsList] = useState([
    { id: 1, title: "Tech Innovators Summit 2026", date: "2026-07-12", location: "Grand Plaza & Hybrid", desc: "Join industry leaders to discuss future trends in AI and web development.", capacity: 3, attendees: [{ userId: 1, status: 'going' }] },
    { id: 2, title: "Creative Designer Meetup", date: "2026-08-05", location: "Social Co-Working Hub", desc: "An informal evening for web designers and artists to collaborate.", capacity: 100, attendees: [] }
  ]);
  const createEvent = (title, date, location, desc, capacity) => {
    const newEvent = {
      id: eventsList.length + 1,
      title: title,
      date: date,
      location: location,
      desc: desc || "Exciting upcoming social event!",
      capacity: parseInt(capacity) || 100,
      attendees: [{ userId: 999, status: 'going' }]
    };
    setEventsList(prev => [...prev, newEvent]);
  };
  const rsvpEvent = (eventId, userId, status) => {
    setEventsList(prev => prev.map(e => {
      if (e.id === eventId) {
        const currentGoingCount = e.attendees.filter(a => a.status === 'going').length;
        const existingAttendee = e.attendees.find(a => a.userId === userId);

        if (status === 'going') {
          const isAlreadyGoing = existingAttendee && existingAttendee.status === 'going';
          if (!isAlreadyGoing && currentGoingCount >= e.capacity) {
            alert(`Event capacity of ${e.capacity} is fully booked! Cannot RSVP Going.`);
            return e;
          }
        }

        let updatedAttendees = [];
        if (existingAttendee) {
          if (status === 'not_going') {
            updatedAttendees = e.attendees.filter(a => a.userId !== userId);
          } else {
            updatedAttendees = e.attendees.map(a => a.userId === userId ? { ...a, status } : a);
          }
        } else if (status !== 'not_going') {
          updatedAttendees = [...e.attendees, { userId, status }];
        } else {
          updatedAttendees = e.attendees;
        }

        return { ...e, attendees: updatedAttendees };
      }
      return e;
    }));
  };

  // Data lists for the dropdowns
  const [notificationsList] = useState([
    { id: 1, sender: "Safak Kocaoglu", action: "liked your post", time: "5 mins ago", avatar: "/assets/person/1.jpeg" },
    { id: 2, sender: "Janell Shrum", action: "commented on your photo", time: "15 mins ago", avatar: "/assets/person/2.jpeg" },
    { id: 3, sender: "Kristen Thomas", action: "shared a new memory", time: "2 hours ago", avatar: "/assets/person/8.jpeg" }
  ]);

  const [chatsList] = useState([
    { id: 1, sender: "Alex Durden", message: "Hey, are we still meeting today?", time: "2 mins ago", avatar: "/assets/person/3.jpeg" },
    { id: 2, sender: "Thomas Holden", message: "Check out this awesome video!", time: "1 hour ago", avatar: "/assets/person/5.jpeg" },
    { id: 3, sender: "Gary Duty", message: "Thanks for the tips!", time: "3 hours ago", avatar: "/assets/person/9.jpeg" }
  ]);

  const [requestsList, setRequestsList] = useState([
    { id: 1, sender: "Dora Hawks", mutual: "4 mutual friends", avatar: "/assets/person/4.jpeg" },
    { id: 2, sender: "Travis Bennett", mutual: "1 mutual friend", avatar: "/assets/person/7.jpeg" }
  ]);

  // Add a new friend/member
  const addMember = (name, profilePic) => {
    const newUser = {
      id: users.length + 1,
      username: name,
      profilePicture: profilePic || `/assets/person/noAvatar.png`
    };
    setUsers(prev => [newUser, ...prev]);

    // Push a new request notification
    setRequestsCount(prev => prev + 1);
    setRequestsList(prev => [
      { id: Date.now(), sender: name, mutual: "New member joined!", avatar: profilePic || `/assets/person/noAvatar.png` },
      ...prev
    ]);
  };

  // Add a new post
  const addPost = (desc, photo, location, feeling, tags, planInfo = null) => {
    const newPost = {
      id: posts.length + 1,
      desc: desc,
      photo: photo || "",
      location: location || "",
      feeling: feeling || "",
      tags: tags || [],
      date: "Just now",
      userId: 999, // default to Bhanu Pratap Yadav
      like: 0,
      comment: 0,
      ...planInfo
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const toggleJoinPlan = (postId, userId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId && p.isPlan) {
        const attendees = p.planAttendees || [];
        const isGoing = attendees.includes(userId);
        let updatedAttendees = [];
        
        if (isGoing) {
          updatedAttendees = attendees.filter(id => id !== userId);
        } else {
          if (attendees.length >= (parseInt(p.planCapacity) || 10)) {
            alert(`Capacity limit of ${p.planCapacity} reached! Cannot join plan.`);
            return p;
          }
          updatedAttendees = [...attendees, userId];
        }
        return { ...p, planAttendees: updatedAttendees };
      }
      return p;
    }));
  };

  // Clear unread badge counts
  const clearBadge = (type) => {
    if (type === 'notifications') setNotificationsCount(0);
    if (type === 'chats') setChatsCount(0);
    if (type === 'requests') setRequestsCount(0);
  };

  return (
    <AppContext.Provider value={{
      users,
      posts,
      notificationsCount,
      chatsCount,
      requestsCount,
      notificationsList,
      chatsList,
      requestsList,
      addMember,
      addPost,
      deletePost,
      toggleJoinPlan,
      clearBadge,
      activeTab,
      setActiveTab,
      bookmarkedPostIds,
      toggleBookmark,
      storiesList,
      addStory,
      viewStory,
      groupsList,
      createGroup,
      joinGroup,
      approveGroupMember,
      postReactions,
      addReaction,
      eventsList,
      createEvent,
      rsvpEvent,
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};
