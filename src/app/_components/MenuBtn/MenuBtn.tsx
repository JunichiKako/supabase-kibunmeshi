"use client";

import React from "react";
import Link from "next/link";
import { useSupabaseSession } from "../../_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import styles from "./MenuBtn.module.css";

const MenuBtn: React.FC = () => {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    const { session, isLoading } = useSupabaseSession();

    if (isLoading) {
        return null; // ローディング中の表示なし、またはローディング表示
    }

    return (
        <header className={styles.site_container}>
            {!session ? (
                <>
                    <Link href="/login" className={styles.login_btn}>
                        <Image
                            src="/images/icons/login-icon.svg"
                            alt="Login"
                            width={20}
                            height={20}
                        />
                        ログイン
                    </Link>
                    <Link href="/signup" className={styles.signup_btn}>
                        <Image
                            src="/images/icons/register-icon.svg"
                            alt="Register"
                            width={20}
                            height={20}
                        />
                        新規登録
                    </Link>
                </>
            ) : (
                <>
                    <Link href="/admin/recipes" className={styles.account_btn}>
                        <Image
                            src="/images/icons/acount-icon.svg" // 新規作成用のアイコン
                            alt="Create New"
                            width={20}
                            height={20}
                        />
                        管理画面
                    </Link>
                    <Link href="/admin/recipes/new">
                        <div className={styles.new_btn}>
                            <Image
                                src="/images/icons/add-icon.svg"
                                alt="Create New"
                                width={20}
                                height={20}
                            />
                            新規作成
                        </div>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className={styles.logout_btn}
                    >
                        <Image
                            src="/images/icons/logout-icon.svg" // ログアウト用のアイコン
                            alt="Logout"
                            width={20}
                            height={20}
                            style={{ display: "block" }}
                        />
                        ログアウト
                    </button>
                </>
            )}
        </header>
    );
};

export default MenuBtn;
