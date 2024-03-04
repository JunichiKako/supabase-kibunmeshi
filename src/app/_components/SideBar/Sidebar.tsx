"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

import Image from "next/image";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // ローディング状態変数

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={isOpen ? `${styles.open}` : ""}>
            <header className={styles.header}>
                <Link href="/">
                    <h1 className={styles.logo}>
                        <Image
                            src="/images/common/logo.png"
                            alt="ロゴ"
                            width={128}
                            height={77}
                            priority={true}
                            className={styles.logo_img}
                        />
                    </h1>
                </Link>
            </header>

            <div className={styles.navToggle} onClick={toggleMenu}>
                <span className={styles.navToggleSpan}></span>
                <span className={styles.navToggleSpan}></span>
                <span className={styles.navToggleSpan}></span>
            </div>

            <aside className={styles.sidebar}>
                <nav className={styles.sidebar_nav}>
                    <ul>
                        <li className={styles.sidebar_list}>
                            <Link
                                href="/"
                                className={styles.sub_menu_home}
                                onClick={toggleMenu}
                            >
                                ホーム
                            </Link>
                        </li>
                        <li className={styles.sidebar_list}>
                            <Link
                                href="#category"
                                className={styles.sub_menu_head}
                                onClick={toggleMenu}
                            >
                                カテゴリ
                            </Link>
                        </li>
                        <li className={styles.sidebar_list}>
                            <Link
                                href="/contact"
                                className={styles.sub_menu_contact}
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
