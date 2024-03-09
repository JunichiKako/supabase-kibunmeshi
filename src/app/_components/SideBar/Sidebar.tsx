"use client";

import { useState } from "react";
import Link from "next/link";
import "./Sidebar.css"; // CSSファイルをインポート

import Image from "next/image";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={isOpen ? "open" : ""}>
            <header className="header">
                <Link href="/">
                    <h1 className="logo">
                        <Image
                            src="/images/common/logo.png"
                            alt="ロゴ"
                            width={128}
                            height={77}
                            priority={true}
                            className="logo_img"
                        />
                    </h1>
                </Link>
            </header>

            <div className="navToggle" onClick={toggleMenu}>
                <span className="navToggleSpan"></span>
                <span className="navToggleSpan"></span>
                <span className="navToggleSpan"></span>
            </div>

            <aside className="sidebar">
                <nav className="sidebar_nav">
                    <ul>
                        <li className="sidebar_list">
                            <Link href="/" className="sub_menu_home">
                                ホーム
                            </Link>
                        </li>
                        <li className="sidebar_list">
                            <Link href="#category" className="sub_menu_head">
                                カテゴリ
                            </Link>
                        </li>
                        <li className="sidebar_list">
                            <Link href="/contact" className="sub_menu_contact">
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
