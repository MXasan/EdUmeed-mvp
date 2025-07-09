import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import "./login.css"; // Подключаем стили

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message); // Показываем ошибку
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        setError("");
        try {
            const result = await signInWithPopup(auth, provider);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={`${import.meta.env.BASE_URL}image/cardS3.jpg`} alt="" />
                {isLogin ? <h2>Welcome back</h2> : <h2>Welcome</h2>}
                <p>Please enter your details to sign in</p>
                <button className="google-btn" onClick={handleGoogleLogin}>
                    <img src={`${import.meta.env.BASE_URL}image/google.svg`} alt="" /> Sign in with Google
                </button>
                <div className="lineP">
                    <div className="linePart"></div>
                    <p>OR</p>
                    <div className="linePart"></div>

                </div>
                {/* <h2>{isLogin ? "Вход" : "Регистрация"}</h2> */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    {error && <p className="error-message">email or password incorect</p>}
                    <button type="submit" className="submit">
                        {isLogin ? "Sign in" : "Sign up"}
                    </button>
                </form>
                <a
                    className="toggle-btn"
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                    }}
                >
                    {isLogin ? (
                        <>
                            Don't have accaunt yet? <span>Sign up</span>
                        </>
                    ) : (
                        <>
                            Alredy had accaunt <span>Sign in</span>
                        </>
                    )}
                </a>

                <hr />

            </div>
        </div>
    );
}

export default Login;
