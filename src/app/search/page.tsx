"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchRecipe from "../_components/SearchRecipe/SearchRecipe";
import Loading from "../_components/Loading/Loading";
import { Recipe } from "../types/recipe";
import { supabase } from "../../utils/supabase";

const Search: React.FC = () => {
    const searchParams = useSearchParams();
    const word = searchParams.get("word");
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    // レシピIDをキー、サムネイル画像URLを値とするオブジェクトの状態を用意
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState<{
        [key: number]: string;
    }>({});

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

    // DBに保存しているthumbnailImageKeyを元に、Supabaseから画像のURLを取得する
    useEffect(() => {
        searchResults.forEach(async (recipe) => {
            const {
                data: { publicUrl },
            } = await supabase.storage
                .from("recipe_thumbnail")
                .getPublicUrl(recipe.thumbnailImageKey);
            setThumbnailImageUrl((prev) => ({
                ...prev,
                [recipe.id]: publicUrl,
            }));
        });
    }, [searchResults]);

    if (loading) {
        return <Loading />; // ローディングコンポーネントを表示
    }

    return (
        <>
            <SearchRecipe />
            <div className="search-results new-content grid">
                {searchResults.slice(0, 6).map((recipe) => (
                    <div key={recipe.id} className="item">
                        <Link href={`/recipe/${recipe.id}`}>
                            {thumbnailImageUrl && (
                                <Image
                                    src={thumbnailImageUrl[recipe.id]}
                                    alt={recipe.title}
                                    layout="fill"
                                />
                            )}
                            <p>{recipe.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default function Page() {
    return (
        <Suspense>
            <Search />
        </Suspense>
    );
}
