import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import BottomNavigation from '../../components/bottomNavigation/BottomNavigation';
import { AppContext } from '../../context/AppContext';
import ProfileSkeleton from './ProfileSkeleton';
import './Profile.css';

const DEFAULT_USER = {
    id: 999,
    username: "Bhanu Pratap Yadav",
    profilePicture: "assets/person/bhanu.jpg",
    coverPicture: "assets/post/profile_banner.png",
    desc: "Hello my friends!",
    city: "Palghar",
    from: "Maharashtra",
    relationship: "Single",
    address: "YadavNagar, Santoshbhawan, NalasoparaEast, Palghar, Maharashtra-401209",
    phone: "7617896131",
    email: "bhanuy9648@gmail.com"
};

const Profile = () => {
    const { users, leftDrawerOpen, rightDrawerOpen, closeDrawers } = useContext(AppContext);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { username } = useParams();

    // Close drawers on mount
    useEffect(() => {
        closeDrawers();
        return () => closeDrawers();
    }, [closeDrawers]);

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (leftDrawerOpen || rightDrawerOpen) {
            document.body.classList.add('drawer-open');
        } else {
            document.body.classList.remove('drawer-open');
        }
    }, [leftDrawerOpen, rightDrawerOpen]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                // Simulate api call loading
                await new Promise((resolve) => setTimeout(resolve, 250));

                // If no username is provided via URL, show the default user.
                // Otherwise, find the user in the context data.
                const matchedUser = !username
                    ? DEFAULT_USER
                    : users.find(u => u.username.toLowerCase() === username.toLowerCase());

                if (matchedUser) {
                    setUser(matchedUser);
                } else {
                    setError("User profile not found.");
                }
            } catch (err) {
                setError("Could not fetch user profile. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [username, users]);

    const cleanPath = (path) => {
        if (!path) return "";
        if (path.startsWith("http") || path.startsWith("/")) return path;
        return "/" + path;
    };

    return (
        <>
            <Topbar />

            <div className="profile">
                <Sidebar />

                <div className="profileRight">
                    {loading ? (
                        <ProfileSkeleton />
                    ) : error ? (
                        <div className="profileMessage errorMessage">
                            {error}
                        </div>
                    ) : (
                        <>
                            <div className="profileRightTop">
                                <div className="profileCover">
                                    <img
                                        className="profileCoverImg"
                                        src={user.coverPicture ? cleanPath(user.coverPicture) : `/assets/person/noCover.png`}
                                        alt={user.username ? `${user.username}'s cover` : 'Cover image'}
                                    />
                                    <img
                                        className="profileUserImg"
                                        src={user.profilePicture ? cleanPath(user.profilePicture) : `/assets/person/noAvatar.png`}
                                        alt={user.username ? `${user.username}'s profile` : 'Profile image'}
                                    />
                                </div>

                                <div className="profileInfo">
                                    <h4 className="profileInfoName">{user.username}</h4>
                                    <span className="profileInfoDesc">{user.desc || "Welcome to my profile page!"}</span>
                                </div>
                            </div>

                            <div className="profileRightBottom">
                                {user.username && (
                                    <>
                                        <Feed username={user.username} />
                                        <Rightbar profile user={user} />
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNavigation />

            {/* Mobile Drawer Overlay Backdrop */}
            <div 
                className={`drawer-overlay ${(leftDrawerOpen || rightDrawerOpen) ? 'active' : ''}`} 
                onClick={closeDrawers}
            />

            {/* Mobile Left Drawer (Sidebar) */}
            <div className={`drawer-content drawer-left ${leftDrawerOpen ? 'active' : ''}`}>
                <Sidebar />
            </div>

            {/* Mobile Right Drawer (Rightbar) */}
            <div className={`drawer-content drawer-right ${rightDrawerOpen ? 'active' : ''}`}>
                <Rightbar />
            </div>
        </>
    );
}

export default Profile;
