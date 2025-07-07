import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate(from, { replace: true }); // возвращаем пользователя обратно
        } catch (error) {
            alert("Ошибка: " + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google вход успешен:", user);
            navigate(from, { replace: true }); // возвращаем пользователя обратно
        } catch (error) {
            console.error("Ошибка входа через Google:", error);
            alert("Ошибка Google-входа: " + error.message);
        }
    };
    return (
        <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
            <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                    }}
                >
                    {isLogin ? "Войти" : "Зарегистрироваться"}
                </button>
            </form>
            <button
                onClick={() => setIsLogin(!isLogin)}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#eee",
                    marginBottom: "10px",
                }}
            >
                {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
            </button>
            <hr style={{ margin: "20px 0" }} />
            <button
                onClick={handleGoogleLogin}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#4285F4",
                    color: "white",
                    border: "none",
                }}
            >
                Войти через Google
            </button>
        </div>
    );
}

export default Login;
