import React from 'react';
import '../App.css'

const ProfileDescription = ({ title, desc, score, scoreDesc }) => {
    return (
        <div className='description-container'>
            <h3>{title}</h3>
            <p className="profile-text">{desc}</p>
            <div className='score-box'>
                <p style={{fontWeight: 'bold'}}>{title} Score: {score}</p>
                <p  >{scoreDesc}</p>
            </div>
        </div>
    );
}

export default ProfileDescription;