import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import "./AllFeedbacks.css";
import { Link } from "react-router-dom";

function AllFeedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFeedbacks(data);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="all-feedbacks">
            <h2>💬 Все отзывы</h2>
            <div className="cardsFeedbackParent">

                {feedbacks.map((fb) => (
                    <div key={fb.id} className="feedback-card">
                        <div className="feedback-header">
                            {fb.photoURL ? (
                                <img src={fb.photoURL} alt="avatar" className="feedback-avatar" />
                            ) : (
                                <div className="feedback-placeholder">
                                    {fb.displayName ? fb.displayName[0].toUpperCase() : "?"}
                                </div>
                            )}

                            <strong className="feedback-name">
                                <Link to={`/user/${fb.uid}`}>{fb.displayName || fb.email}</Link>
                            </strong>
                        </div>

                        <p className="feedback-message">{fb.message}</p>

                        <small className="feedback-time">
                            {fb.createdAt?.toDate().toLocaleString()}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllFeedbacks;
