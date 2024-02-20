"use client";

import React from "react";
import { useState, FormEvent } from "react";
import "./form.css";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 簡単なバリデーション
        if (!email || !password) {
            setErrorMessage("メールアドレスとパスワードを入力してください");
            return;
        }
        setErrorMessage("");
    };

    return (
        <div className="form-container">
            <div className="form-header">ログイン</div>
            <form className="login-form" onSubmit={handleSubmit}>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <div className="form-group">
                    <label htmlFor="email">メールアドレス</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">パスワード</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group-button">
                    <button type="submit" className="form-button">
                        ログイン
                    </button>
                </div>
            </form>
        </div>
        
    );
}
