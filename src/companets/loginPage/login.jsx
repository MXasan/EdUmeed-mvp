import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Успешный вход!");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Регистрация успешна!");
            }
        } catch (error) {
            alert("Ошибка: " + error.message);
        }
    };
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            alert("Вы вошли через Google: " + user.email);
            // тут можно также сохранить в Firestore, если хочешь
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
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <button
                    type="submit"
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                >
                    {isLogin ? "Войти" : "Зарегистрироваться"}
                </button>
            </form>
            <button
                onClick={() => setIsLogin(!isLogin)}
                style={{ width: "100%", padding: "10px", backgroundColor: "#eee" }}
            >
                {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
            </button>
            <hr style={{ margin: "20px 0" }} />
            <button
                onClick={handleGoogleLogin}
                style={{ width: "100%", padding: "10px", backgroundColor: "#4285F4", color: "white", border: "none" }}
            >
                Войти через Google
            </button>
        </div>
    );
}

export default Login;
