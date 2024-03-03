"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./sidebar.css";
import { client } from "@/libs/client";
import { Category } from "../../types/recipe";
import Image from "next/image";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]); // カテゴリーの状態変数
    const [isLoading, setIsLoading] = useState(true); // ローディング状態変数

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    // カテゴリー一覧
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true); // ローディング開始
            try {
                // APIからデータを取得
                const response = await fetch("/api/categories");
                const data = await response.json();
                if (response.ok) {
                    setCategories(data.categories); // APIのレスポンスに合わせて修正
                } else {
                    throw new Error(
                        data.message || "データの取得に失敗しました"
                    );
                }
            } catch (error) {
                console.error("Fetching categories failed", error);
            } finally {
                setIsLoading(false); // ローディング終了
            }
        }

        fetchData();
    }, []);

    return (
        <div className={`side-menu ${isOpen ? "open" : ""}`}>
            <header className="header">
                <Link href="/">
                    <h1 className="logo">
                        <Image
                            src="/images/common/logo.png"
                            alt="ロゴ"
                            width={128}
                            height={77}
                            priority={true}
                        />
                    </h1>
                </Link>
            </header>

            <div id="nav-toggle" onClick={toggleMenu}>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <aside className="sidebar">
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link
                                href="/"
                                className="sub-menu-home"
                                onClick={toggleMenu}
                            >
                                ホーム
                            </Link>
                        </li>
                        <li className="sub-menu">
                            <Link
                                href="#category"
                                className="sub-menu-head"
                                onClick={toggleMenu}
                            >
                                カテゴリ
                            </Link>
                            <ul className="sub-menu-nav">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link href={`/category/${category.id}`}>
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="sub-menu-contact"
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
