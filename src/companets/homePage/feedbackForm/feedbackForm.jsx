import { useState, useContext } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./FeedbackForm.css";

function FeedbackForm() {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setStatus("Вы должны войти в аккаунт, чтобы отправить отзыв.");
      return;
    }

    if (!message.trim()) {
      setStatus("Пожалуйста, напишите что-нибудь :)");
      return;
    }

    try {
      await addDoc(collection(db, "feedbacks"), {
        uid: currentUser.uid,
        email: currentUser.email,
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
