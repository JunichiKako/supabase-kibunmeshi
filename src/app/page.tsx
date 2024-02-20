"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { client } from "../libs/client";
import { Recipe, RecipeList } from "./types/recipe";
import "./main.css";
import CategoryList from "./_components/CategoryList/CategoryList";
import SearchRecipe from "./_components/SearchRecipe/SearchRecipe";
import Loading from "./_components/Loading/Loading";
import Image from "next/image";

export default function Home() {
    const [recipeList, setRecipeList] = useState<RecipeList | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // レシピ一覧の取得
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await client.getList<Recipe>({
                    endpoint: "kibunmeshi",
                });
                setRecipeList(response);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false); // データ取得後にローディングを終了
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div>
            <SearchRecipe />
            <div className="new-content grid">
                {recipeList?.contents.slice(0, 6).map((content) => (
                    <div key={content.id} className="item">
                        <Link href={`/recipe/${content.id}`}>
                            {content.recipes[0]?.img?.url ? (
                                <Image
                                    src={content.recipes[0].img.url} // ここで`undefined`ではないことが保証されています
                                    alt={content.title}
                                    width={300}
                                    height={200}
                                    priority={true}
                                    style={{objectFit: "cover"}}
                                />
                            ) : (
                                // `src`が`undefined`の場合の代替コンテンツ
                                <div>No image available</div>
                            )}
                            <p>{content.title}</p>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="recipe-all ">
                <Link href="/recipes">
                    <div className="btn">レシピ一覧はこちらから</div>
                </Link>
            </div>

            <CategoryList />
        </div>
    );
}
