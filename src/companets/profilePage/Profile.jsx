import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

function Profile() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    if (!currentUser) {
        return <p style={{ padding: "40px", textAlign: "center" }}>Загрузка...</p>;
    }

    return (
        <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
            <h2>👤 Профиль</h2>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Метод входа:</strong> {currentUser.providerData[0]?.providerId}</p>

            <button
                onClick={handleLogout}
                style={{
                    marginTop: "20px",
                    padding: "10px",
                    width: "100%",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                }}
            >
                Выйти
            </button>
        </div>
    );
}

export default Profile;
