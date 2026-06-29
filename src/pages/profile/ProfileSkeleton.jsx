import React from 'react';
import './Profile.css';

const ProfileSkeleton = () => {
    return (
        <>
            <div className="profileRightTop">
                <div className="profileCover skeleton">
                    <div className="profileCoverImg" />
                    <div className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <div className="skeleton skeleton-text skeleton-text-name"></div>
                    <div className="skeleton skeleton-text skeleton-text-desc"></div>
                </div>
            </div>
            <div className="profileRightBottom">
                {/* Placeholder for Feed and Rightbar skeletons if needed in the future */}
            </div>
        </>
    );
};

export default ProfileSkeleton;