import React, { useState } from 'react'
import './Profile.css'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [image, setImage] = useState(false)
    const [profileData, setProfileData] = useState({
        fullName: "Princi Maligai Admin",
        email: "admin@princimaligai.com",
        phone: "+91 98765 43210",
        location: "Chennai, Tamil Nadu",
        role: "Store Manager"
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
        }
    }

    const handleSave = () => {
        setIsEditing(false)
        toast.success("Profile updated successfully!")
        // In a real app, you would send the image and data to backend here
    }

    return (
        <div className='profile-page'>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-cover"></div>
                    <div className="profile-avatar-wrapper">
                        <label htmlFor="image" className={`avatar-label ${isEditing ? 'editable' : ''}`}>
                            <img
                                src={image ? URL.createObjectURL(image) : assets.profile_image}
                                alt="Admin"
                                className="profile-avatar"
                            />
                            {isEditing && (
                                <div className="avatar-overlay">
                                    <span>📷</span>
                                </div>
                            )}
                        </label>
                        {isEditing && <input type="file" id="image" hidden onChange={handleImageChange} accept="image/*" />}
                        <span className="profile-status-indicator"></span>
                    </div>
                </div>

                <div className="profile-content">
                    <div className="profile-main-info">
                        {isEditing ? (
                            <input
                                type="text"
                                name="role"
                                value={profileData.role}
                                onChange={handleInputChange}
                                className="profile-input role-input"
                            />
                        ) : (
                            <>
                                <h1>Admin User</h1>
                                <p className="role-badge">{profileData.role}</p>
                            </>
                        )}
                    </div>

                    <div className="profile-grid">
                        <div className="profile-card info-card">
                            <div className="card-header">
                                <h3>Personal Information</h3>
                            </div>

                            <div className="info-row">
                                <span className="info-label">Full Name</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={profileData.fullName}
                                        onChange={handleInputChange}
                                        className="profile-input"
                                    />
                                ) : (
                                    <span className="info-value">{profileData.fullName}</span>
                                )}
                            </div>

                            <div className="info-row">
                                <span className="info-label">Email</span>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        className="profile-input"
                                    />
                                ) : (
                                    <span className="info-value">{profileData.email}</span>
                                )}
                            </div>

                            <div className="info-row">
                                <span className="info-label">Phone</span>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleInputChange}
                                        className="profile-input"
                                    />
                                ) : (
                                    <span className="info-value">{profileData.phone}</span>
                                )}
                            </div>

                            <div className="info-row">
                                <span className="info-label">Location</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={profileData.location}
                                        onChange={handleInputChange}
                                        className="profile-input"
                                    />
                                ) : (
                                    <span className="info-value">{profileData.location}</span>
                                )}
                            </div>
                        </div>

                        <div className="profile-card stats-card">
                            <h3>Account Overview</h3>
                            <div className="stat-row">
                                <span className="stat-label">Member Since</span>
                                <span className="stat-value">Jan 2024</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Last Login</span>
                                <span className="stat-value">Just now</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Role</span>
                                <span className="stat-value">Super Admin</span>
                            </div>

                            {isEditing ? (
                                <div className="edit-actions">
                                    <button className="save-btn" onClick={handleSave}>Save Changes</button>
                                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            ) : (
                                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
