import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "./userProfile.css";

function UserProfile() {
  const { uid } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserInfo({
          displayName: userData.name || "Не указано",
          photoURL: userData.photo || null,
        });
      } else {
        setUserInfo({ displayName: "Не найден", photoURL: null });
      }

      const q = query(collection(db, "feedbacks"), where("uid", "==", uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(data);
    };

    fetchUserData();
  }, [uid]);

  if (!userInfo) return <p className="loading">Загрузка профиля...</p>;

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        {userInfo.photoURL && (
          <img src={userInfo.photoURL} alt="Аватар" className="profile-avatar" />
        )}
        <h2 className="profile-name">{userInfo.displayName}</h2>
      </div>

      <h3 className="feedback-title">📝 Отзывы:</h3>
      <div className="feedback-list">
        {feedbacks.map((f) => (
          <div key={f.id} className="feedback-card">
            <p>{f.message}</p>
            <small>{f.createdAt?.toDate().toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
