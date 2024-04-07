"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // ここをログインまたはサインアップに応じて適切なSupabaseの関数に変更
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
        <div className="auth-block">
            <div className="auth-block__header">ログイン</div>
            <form className="auth-block__form" onSubmit={handleSubmit}>
                <div className="auth-group">
                    <label htmlFor="email" className="auth-group__label">
                        メールアドレス
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-group__input"
                    />
                </div>
                <div className="auth-group">
                    <label htmlFor="password" className="auth-group__label">
                        パスワード
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-group__input"
                    />
                </div>
                <div className="auth-group__action">
                    <button type="submit" className="auth-group__btn">
                        ログイン
                    </button>
                </div>
            </form>
        </div>
    );
}
