"use client";

import React from "react";
import styles from "./Singup.module.css";
import { supabase } from "@/utils/supabase";
import { useState } from "react";

const SingUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `http://localhost:3000/login`,
            },
        });
        if (error) {
            alert("登録に失敗しました");
        } else {
            setEmail("");
            setPassword("");
            alert("確認メールを送信しました。");
        }
    };

    return (
        <div className={styles.form_container}>
            <div className={styles.form_header}>#新規登録</div>
            <form onSubmit={handleSubmit} className={styles.login_form}>
                <div className={styles.form_group}>
                    <label htmlFor="email" className={styles.form_label}>
                        メールアドレス
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={styles.form_input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="password" className={styles.form_label}>
                        パスワード
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={styles.form_input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.form_group_button}>
                    <button type="submit" className={styles.new_button}>
                        新規登録
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SingUp;
