"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "../main.css";
import "./search.css";
import Image from "next/image";
import SearchRecipe from "../_components/SearchRecipe/SearchRecipe";
import Loading from "../_components/Loading/Loading";
import { Recipe } from "../types/recipe";


const Search: React.FC = () => {
    const searchParams = useSearchParams();
    const word = searchParams.get("word");
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                setLoading(true);
                const url = new URL("/api/recipes", window.location.origin);
                if (word) {
                    url.searchParams.append("search", word);
                }
                const response = await fetch(url.toString());
                const data = await response.json();

                console.log(data);
                

                if (response.ok) {
                    setSearchResults(data);
                } else {
                    throw new Error(
                        data.message || "検索中にエラーが発生しました"
                    );
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        handleSearch();
    }, [word]);

    if (loading) {
        return <Loading />; // ローディングコンポーネントを表示
    }

    return (
        <div>
            <SearchRecipe />
            {/* 検索結果の表示 */}
            <div className="search-results">
                {searchResults.slice(0, 6).map((recipe) => (
                    <div key={recipe.id} className="item">
                        <Link href={`/recipe/${recipe.id}`}>
                            {recipe.thumbnailUrl && (
                                <Image
                                    src={recipe.thumbnailUrl}
                                    alt={recipe.title}
                                    layout="fill"
                                />
                            )}
                            <p>{recipe.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <Suspense>
            <Search />
        </Suspense>
    );
}
