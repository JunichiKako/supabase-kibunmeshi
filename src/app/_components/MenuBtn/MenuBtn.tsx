"use client";

import React from "react";
import Link from "next/link";
import { useSupabaseSession } from "../../_hooks/useSupabaseSession";
import { supabase } from "@/utils/supabase";
import Image from "next/image";

const MenuBtn = () => {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    const { session, isLoading } = useSupabaseSession();

    if (isLoading) {
        return null;
    }

    return (
        <div className="menubtn-container">
            {!session ? (
                <>
                    <Link href="/login" className="login_btn">
                        <Image
                            src="/images/icons/login-icon.svg"
                            alt="Login"
                            width={20}
                            height={20}
                        />
                        ログイン
                    </Link>
                    <Link href="/signup" className="signup_btn">
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
                    <Link href="/admin/recipes" className="account_btn">
                        <Image
                            src="/images/icons/acount-icon.svg" // 新規作成用のアイコン
                            alt="Create New"
                            width={20}
                            height={20}
                        />
                        管理画面
                    </Link>
                    <Link href="/admin/recipes/new" className="new_btn">
                        <Image
                            src="/images/icons/add-icon.svg"
                            alt="Create New"
                            width={20}
                            height={20}
                        />
                        新規作成
                    </Link>
                    <Link href="/" onClick={handleLogout} className="logout_btn">
                        <Image
                            src="/images/icons/logout-icon.svg" // ログアウト用のアイコン
                            alt="Logout"
                            width={20}
                            height={20}
                        />
                        ログアウト
                    </Link>
                </>
            )}
        </div>
    );
};

export default MenuBtn;
