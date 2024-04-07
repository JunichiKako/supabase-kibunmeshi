"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    // メニューの開閉
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // SP版のカテゴリーをクリックした時にメニューを閉じる
    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleInternalLink = () => {
        closeMenu();
    };

    return (
        <div className="sidebar">
            <div
                className={`navToggle ${isOpen ? "open" : ""}`}
                onClick={toggleMenu}
            >
                <span className="navToggleSpan"></span>
                <span className="navToggleSpan"></span>
                <span className="navToggleSpan"></span>
            </div>

            <header className="sidebar__header">
                <Link href="/">
                    <h1 className="sidebar__logo">
                        <Image
                            src="/images/common/logo.png"
                            alt="ロゴ"
                            width={180}
                            height={77}
                            priority={true}
                        />
                    </h1>
                </Link>
            </header>

            <aside className={`sidebar__main ${isOpen ? "show" : "hide"}`}>
                <nav className="sidebar__nav">
                    <ul>
                        <li className="sidebar__list">
                            <Link
                                href="/"
                                className="sidebar__item"
                                onClick={handleInternalLink}
                            >
                                ホーム
                            </Link>
                        </li>
                        <li className="sidebar__list">
                            <Link
                                href="#category"
                                onClick={handleInternalLink}
                                className="sidebar__item"
                            >
                                カテゴリ
                            </Link>
                        </li>
                        <li className="sidebar__list">
                            <Link
                                href="/contact"
                                className="sidebar__item"
                                onClick={handleInternalLink}
                            >
                                お問い合わせ
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
