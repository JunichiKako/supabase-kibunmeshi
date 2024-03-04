import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./MenuBtn.module.css";

const MenuBtn = () => {
    return (
        <header className={styles.site_btn}>
            <Link href="/login" className={styles.login_btn}>
                ログイン
                <Image
                    src="/images/icons/login-icon.svg"
                    alt="Login"
                    width={20}
                    height={20}
                    style={{ display: "block" }}
                />
            </Link>
            <Link href="/signup" className={styles.singup_btn}>
                新規登録
                <Image
                    src="/images/icons/register-icon.svg"
                    alt="Login"
                    width={20}
                    height={20}
                    style={{ display: "block" }}
                />
            </Link>
            <Link href="/admin/recipes/new" className={styles.singup_btn}>
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
