"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setErrorMessage("ログインに失敗しました");
        } else {
            router.replace("/admin/recipes");
        }
    };

    return (
        <div className="form_container">
            <div className="form_header">ログイン</div>
            <form className="login_form" onSubmit={handleSubmit}>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <div className="form_group">
                    <label htmlFor="email" className="form_label">
                        メールアドレス
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form_input"
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="password" className="form_label">
                        パスワード
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form_input"
                    />
                </div>
                <div className="form_group_button">
                    <button type="submit" className="form_button">
                        ログイン
                    </button>
                </div>
            </form>
        </div>
    );
}
