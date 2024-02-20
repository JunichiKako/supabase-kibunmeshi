"use client";

import React, { useState } from "react";
import MenuBtn from "../MenuBtn/MenuBtn";
import "./SearchRecipe.css";
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
        <div className="content-header">
            {/* 検索フォーム */}
            <div className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="レシピを検索"
                />
                <button onClick={handleSearch} className="search-btn">
                    検索
                </button>
            </div>
            <MenuBtn />
        </div>
    );
};

export default SearchRecipe;
