import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useUserProfile } from "../../hooks/useUserProfile";
import "./profile.css";

function Profile() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    const {
        name, setName,
        feeling, setFeeling,
        about, setAbout,
        photo, photoPreview,
        handlePhotoChange,
        saveProfile,
        loading
    } = useUserProfile(currentUser);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const handleSave = async () => {
        await saveProfile();
        setEditMode(false);
    };

    if (loading || !currentUser) {
        return <p className="loading">Загрузка...</p>;
    }

    return (
        <div className="profile-container">
            <img
                className="profileIconInProfilePage"
                src={photoPreview || photo || `${import.meta.env.BASE_URL}image/profileIcon.svg`}
                alt="profile"
            />

            {editMode && (
                <div className="input-group">
                    <label>Фото профиля:</label>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                </div>
            )}

            {editMode ? (
                <>
                    <div className="input-group name">
                        <label>Имя:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="input-group ">
                        <label>feeling:</label>
                        <input type="text" value={feeling} onChange={(e) => setFeeling(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label>О себе:</label>
                        <textarea rows="4" value={about} onChange={(e) => setAbout(e.target.value)} />
                    </div>

                    <button className="save-btn" onClick={handleSave}>Сохранить</button>
                </>
            ) : (
                <>
                    <h2>{name}</h2>
                    <p className="gmail"> {currentUser.email}</p>
                    <button className="edit-btn" onClick={() => setEditMode(true)}>✏️ Редактировать</button>
                    <p className="feeling"><strong>feeling:</strong> {feeling || "Не указано"}</p>
                    <div className="aboutMe">
                        <p ><strong>О себе:</strong></p>
                        <div className="lineProfile"> {about || "Не указано"}</div>
                        <p></p>
                    </div>
                </>
            )}
            {editMode && <button className="cancel-btn" onClick={() => setEditMode(false)}>Отмена</button>}

            {!editMode && <button className="logout-btn" onClick={handleLogout}>Выйти</button>}

        </div>
    );
}

export default Profile;
