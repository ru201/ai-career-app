import React from 'react';
import '../App.css'

const ProfileDescription = ({ title, desc, score, scoreDesc }) => {
    return (
        <div className='description-container'>
            <h3 className="smaller-text">{title}</h3>
            <p className="smaller-text">{desc}</p>
            <div className='score-box'>
                <p className="smaller-text" style={{fontWeight: 'bold'}}>{title} Score: {score}</p>
                <p className="smaller-text" >{scoreDesc}</p>
            </div>
        </div>
    );
}

export default ProfileDescription;