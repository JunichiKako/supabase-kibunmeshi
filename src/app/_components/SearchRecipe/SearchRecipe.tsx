"use client";

import { useState } from "react";
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
        <div className="search-container">
            {/* 検索フォーム */}
            <div className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        // エンターキーが押された場合に検索を実行
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    placeholder="レシピを検索"
                    className="search-form__input"
                />
            </div>
        </div>
    );
};

export default SearchRecipe;
