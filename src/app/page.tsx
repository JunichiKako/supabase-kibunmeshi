"use client";

// Next.js 各ページはこの並びで記述する
import Link from "next/link";
import Image from "next/image";
// React
import React, { useState, useEffect } from "react";
// Components
import CategoryList from "./_components/CategoryList/CategoryList";
import SearchRecipe from "./_components/SearchRecipe/SearchRecipe";
import Loading from "./_components/Loading/Loading";
// typeScript
import { Recipe } from "./types/recipe";
// CSS
import styles from "./Home.module.css";
import { supabase } from "../utils/supabase";

export default function Home() {
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState<{
        [key: number]: string;
    }>({});

    // レシピ一覧の取得
    useEffect(() => {
        setThumbnailImageUrl;
        async function fetchData() {
            try {
                const response = await fetch("/api/recipes");
                const data = await response.json();
                if (response.ok) {
                    setRecipeList(data);
                } else {
                    throw new Error(
                        data.message || "データの取得に失敗しました"
                    );
                }
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false); // データ取得後にローディングを終了
            }
        }

        fetchData();
    }, []);

    // DBに保存しているthumbnailImageKeyを元に、Supabaseから画像のURLを取得する
    useEffect(() => {
        async function fetchRecipeImages() {
            const newImageUrls = { ...thumbnailImageUrl }; // 現在の状態をコピー

            await Promise.all(
                recipeList.map(async (recipe) => {
                    if (recipe.thumbnailImageKey) {
                        const { data } = await supabase.storage
                            .from("recipe_thumbnail")
                            .getPublicUrl(recipe.thumbnailImageKey);

                        if (data.publicUrl) {
                            newImageUrls[recipe.id] = data.publicUrl;
                        }
                    }
                })
            );

            setThumbnailImageUrl(newImageUrls); // 新しいURLマップで状態を更新
        }

        if (recipeList.length > 0) {
            fetchRecipeImages();
        }
    }, [recipeList, thumbnailImageUrl]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <SearchRecipe />
            <div className="new-content grid">
                {recipeList.map((recipe) => (
                    <div key={recipe.id} className="item">
                        <Link href={`/recipe/${recipe.id}`}>
                            {thumbnailImageUrl[recipe.id] ? (
                                <Image
                                    src={thumbnailImageUrl[recipe.id]}
                                    alt={recipe.title}
                                    width={300}
                                    height={200}
                                    style={{ objectFit: "cover" }}
                                    loading="lazy"
                                    rel="preload"
                                />
                            ) : (
                                <div>No image available</div>
                            )}
                            <p>{recipe.title}</p>
                        </Link>
                    </div>
                ))}
            </div>

            <div className={styles.recipe_all}>
                <Link href="/recipes">
                    <div className={styles.recipe_all_btn}>
                        レシピ一覧はこちらから
                    </div>
                </Link>
            </div>

            <CategoryList />
        </>
    );
}
