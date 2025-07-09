// hooks/useUserProfile.js
import { useState, useEffect } from "react";

export const useUserProfile = (currentUser) => {
    const [name, setName] = useState(currentUser?.displayName || "");
    const [feeling, setFeeling] = useState("");
    const [about, setAbout] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedPhoto = localStorage.getItem("userPhoto");
        const savedName = localStorage.getItem("userName");
        const savedFeeling = localStorage.getItem("userFeeling");
        const savedAbout = localStorage.getItem("userAbout");

        if (savedPhoto) setPhoto(savedPhoto);
        if (savedName) setName(savedName);
        if (savedFeeling) setFeeling(savedFeeling);
        if (savedAbout) setAbout(savedAbout);

        setLoading(false);
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                setPhoto(base64);
                setPhotoPreview(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveProfile = () => {
        localStorage.setItem("userPhoto", photo);
        localStorage.setItem("userName", name);
        localStorage.setItem("userFeeling", feeling);
        localStorage.setItem("userAbout", about);
    };

    const deletePhoto = () => {
        setPhoto(null);
        setPhotoPreview(null);
        localStorage.removeItem("userPhoto");
    };

    return {
        name, setName,
        feeling, setFeeling,
        about, setAbout,
        photo, photoPreview,
        handlePhotoChange,
        deletePhoto,
        saveProfile,
        loading
    };
};
