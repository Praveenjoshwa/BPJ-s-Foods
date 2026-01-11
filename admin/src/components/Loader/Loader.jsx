import React from 'react'
import "./Loader.css"

const Loader = () => {
    return (
        <div className='loader-container'>
            <div className="loader-content">
                <div className="video-wrapper">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="loader-video"
                        src="/src/assets/Market Seller.mp4"
                    />
                </div>
                <h2 className="loader-title">Princi Maligai</h2>
                <p className="loader-subtitle">Admin Panel</p>
            </div>
        </div>
    )
}

export default Loader
