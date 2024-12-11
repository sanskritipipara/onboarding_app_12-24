import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { AuthRootState, login } from "../redux/slices/authSlice.ts";
import { useDispatch, useSelector } from "react-redux";

const Login: React.FC = () => {
    const [username, setUsername] = useState("user123");
    const [password, setPassword] = useState("password123");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state: AuthRootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/onboarding");
        }
    }, [isAuthenticated, navigate]);


    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        const correctUsername = "user123";
        const correctPassword = "password123";

        if (username === correctUsername && password === correctPassword) {
            dispatch(login({ username }));
            navigate("/onboarding");
        } else {
            setErrorMessage("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
            </form>
        </div>
    );
};

export default Login;
