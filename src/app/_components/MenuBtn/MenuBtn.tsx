import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./MenuBtn.css";

const MenuBtn = () => {
    return (
        <header className="site-btn">
            <Link href="/login" className="login-btn">
                ログイン
                <Image
                    src="/images/icons/login-icon.svg"
                    alt="Login"
                    width={20}
                    height={20}
                    style={{ display: "block" }}
                />
            </Link>
            <Link href="/signup" className="singup-btn">
                新規登録
                <Image
                    src="/images/icons/register-icon.svg"
                    alt="Login"
                    width={20}
                    height={20}
                    style={{ display: "block" }}
                />
            </Link>
            <Link href="/admin/recipes/new" className="singup-btn">
                新規作成
                <Image
                    src="/images/icons/register-icon.svg"
                    alt="Login"
                    width={20}
                    height={20}
                    style={{ display: "block" }}
                />
            </Link>
        </header>
    );
};

export default MenuBtn;
