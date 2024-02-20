"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./sidebar.css";
import { client } from "@/libs/client";
import { Category } from "../../types/recipe";
import Image from 'next/image';


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
            try {
                // APIからデータを取得
                const response = await client.getList({
                    endpoint: "category",
                });

                setCategories(response.contents);
                setIsLoading(false);
            } catch (error) {
                // エラーを処理

                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className={`side-menu ${isOpen ? "open" : ""}`}>
            <header className="header">
                <Link href="/">
                    <h1 className="logo">
                    <Image src="/images/common/logo.png" alt="ロゴ" width={128} height={77} priority={true}/>
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
                                onClick={toggleMenu}>
                                ホーム
                            </Link>
                        </li>
                        <li className="sub-menu">
                            <Link
                                href="#category"
                                className="sub-menu-head"
                                onClick={toggleMenu}>
                                カテゴリ
                            </Link>
                            <ul className="sub-menu-nav">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link href={`/category/${category.id}`}>
                                            {category.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="sub-menu-contact"
                                onClick={toggleMenu}>
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
