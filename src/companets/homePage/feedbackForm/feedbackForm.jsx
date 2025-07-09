import { useState, useContext } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";

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
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h3>📝 Оставьте отзыв</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Напишите, что вы думаете..."
          rows={5}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
          }}
        >
          Отправить
        </button>
      </form>
      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}

export default FeedbackForm;
