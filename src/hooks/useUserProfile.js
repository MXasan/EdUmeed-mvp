import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useUserProfile = (currentUser) => {
  const [name, setName] = useState(currentUser?.displayName || "");
  const [feeling, setFeeling] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    if (!currentUser) return;

    // Загружаем из Firestore
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.name) setName(data.name);
      if (data.feeling) setFeeling(data.feeling);
      if (data.about) setAbout(data.about);
      if (data.photo) {
        setPhoto(data.photo);
        setPhotoPreview(data.photo);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
    window.addEventListener("userProfileUpdated", loadProfile);
    return () => window.removeEventListener("userProfileUpdated", loadProfile);
  }, [currentUser]);

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

  const saveProfile = async () => {
    if (!currentUser) return;

    // Сохраняем в Firestore
    await setDoc(doc(db, "users", currentUser.uid), {
      name,
      photo,
      feeling,
      about,
    }, { merge: true });

    // Обновляем localStorage
    localStorage.setItem("userPhoto", photo);
    localStorage.setItem("userName", name);
    localStorage.setItem("userFeeling", feeling);
    localStorage.setItem("userAbout", about);

    window.dispatchEvent(new Event("userProfileUpdated"));
  };

  const deletePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    localStorage.removeItem("userPhoto");
    window.dispatchEvent(new Event("userProfileUpdated"));
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
