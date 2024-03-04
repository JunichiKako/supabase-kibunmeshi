"use client";

import React, { useState } from "react";
import MenuBtn from "../MenuBtn/MenuBtn";
import styles from "./SearchRecipe.module.css";
import { useRouter } from "next/navigation";

const SearchRecipe = () => {
    // 検索用の状態変数
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    // 検索関数
    const handleSearch = async () => {
        await router.push(`/search/?word=${searchTerm}`);
    };
    return (
        <div className={styles.content_header}>
            {/* 検索フォーム */}
            <div className={styles.search_form}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="レシピを検索"
                    className={styles.search_input}
                />
                <button onClick={handleSearch} className={styles.search_btn}>
                    検索
                </button>
            </div>
            <MenuBtn />
        </div>
    );
};

export default SearchRecipe;
