import React from 'react';

const TopbarDropdown = ({ type, items, onClose }) => {
  const getHeaderTitle = () => {
    if (type === 'notifications') return 'Notifications';
    if (type === 'chats') return 'Direct Messages';
    return 'Friend Requests';
  };

  const getCleanPic = (avatar) => {
    if (!avatar) return '/assets/person/noAvatar.png';
    return avatar.startsWith('/') ? avatar : '/' + avatar;
  };

  return (
    <div 
      style={{
        position: 'absolute',
        top: '55px',
        right: type === 'requests' ? '110px' : type === 'chats' ? '60px' : '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        width: '320px',
        borderRadius: '16px',
        boxShadow: '0px 10px 30px rgba(15, 23, 42, 0.12)',
        zIndex: 1000,
        color: '#1e293b',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
        border: '1px solid rgba(226, 232, 240, 0.8)'
      }}
    >
      <div 
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(248, 250, 252, 0.6)'
        }}
      >
        <span style={{ fontWeight: '700', fontSize: '15px', color: '#3b82f6', fontFamily: 'Outfit, sans-serif' }}>
          {getHeaderTitle()}
        </span>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#94a3b8',
            transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
        >
          &times;
        </button>
      </div>

      <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
        {items.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
            No new {type}
          </div>
        ) : (
          items.map((item) => (
            <div 
              key={item.id}
              style={{
                display: 'flex',
                padding: '12px 18px',
                borderBottom: '1px solid #f1f5f9',
                alignItems: 'center',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <img 
                src={getCleanPic(item.avatar)} 
                alt="" 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '12px',
                  border: '1.5px solid #e2e8f0'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '13px', lineHeight: '1.4', color: '#334155' }}>
                  <strong style={{ color: '#0f172a' }}>{item.sender}</strong> {item.action || item.message || item.mutual}
                </span>
                {item.time && (
                  <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>
                    {item.time}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div 
        style={{
          padding: '12px 18px',
          borderTop: '1px solid #f1f5f9',
          textAlign: 'center',
          backgroundColor: 'rgba(248, 250, 252, 0.6)'
        }}
      >
        <span 
          style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#3b82f6',
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#2563eb'}
          onMouseLeave={e => e.currentTarget.style.color = '#3b82f6'}
          onClick={onClose}
        >
          Mark all as read
        </span>
      </div>
    </div>
  );
};

export default TopbarDropdown;
