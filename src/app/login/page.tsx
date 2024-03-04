"use client";

import React from "react";
import { useState, FormEvent } from "react";
import styles from "./Login.module.css";

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
        <div className={styles.form_container}>
            <div className={styles.formh_eader}>ログイン</div>
            <form className={styles.login_form} onSubmit={handleSubmit}>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <div className={styles.form_group}>
                    <label htmlFor="email" className={styles.form_label}>
                        メールアドレス
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.form_input}
                    />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="password" className={styles.form_label}>
                        パスワード
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.form_input}
                    />
                </div>
                <div className={styles.form_group_button}>
                    <button type="submit" className={styles.form_button}>
                        ログイン
                    </button>
                </div>
            </form>
        </div>
    );
}
