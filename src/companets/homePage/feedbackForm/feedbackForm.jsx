import { useState, useContext } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import "./FeedbackForm.css";

function FeedbackForm() {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !message.trim()) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : {};

      await addDoc(collection(db, "feedbacks"), {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: userData.name || currentUser.displayName || currentUser.email,
        photoURL: userData.photo || currentUser.photoURL || null,
        message: message.trim(),
        createdAt: Timestamp.now(),
      });

      setMessage("");
      setStatus("Спасибо за отзыв!");
    } catch (error) {
      console.error("Ошибка отправки отзыва:", error);
      setStatus("Ошибка при отправке. Попробуйте позже.");
    }
  };
  return (
    <div className="feedback-container">
      <h3 className="feedback-title">📝 Оставьте отзыв</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Напишите, что вы думаете..."
          rows={5}
          className="feedback-textarea"
        />
        <button type="submit" className="feedback-button">
          Отправить
        </button>
      </form>
      {status && <p className="feedback-status">{status}</p>}
    </div>
  );
}

export default FeedbackForm;
