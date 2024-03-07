"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Recipe } from "../../types/recipe";
import Link from "next/link";
import Loading from "@/app/_components/Loading/Loading";
import Image from "next/image";
import styles from "./Category.module.css";
import { supabase } from "../../../utils/supabase";

const CategoryList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [categoryName, setCategoryName] = useState(""); // カテゴリー名を状態として追加
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState<{
        [key: number]: string;
    }>({});

    const { id } = useParams();

    useEffect(() => {
        async function fetchRecipes() {
            try {
                if (!id) return;
                // `/api/recipes?category=${id}`は、カテゴリーIDに基づいてレシピをフェッチするAPIエンドポイントの仮の例です
                const response = await fetch(`/api/categories/${id}`);
                const data = await response.json();
                setRecipes(data.category.recipes);
                setCategoryName(data.category.name); // カテゴリー名を更新
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error
                        : new Error("An error occurred")
                );
            } finally {
                setLoading(false);
            }
        }

        fetchRecipes();
    }, [id]);

    useEffect(() => {
        // 各レシピのサムネイルURLを保持するためのオブジェクト
    
        const fetcher = async () => {
            // Promise.allを使用して、すべてのレシピのサムネイルURLを非同期に取得
            await Promise.all(recipes.map(async (recipe) => {
                if (recipe.thumbnailImageKey) {
                    const { data } = await supabase.storage
                        .from("recipe_thumbnail")
                        .getPublicUrl(recipe.thumbnailImageKey);

                    // サムネイルURLをオブジェクトに追加
                    setThumbnailImageUrl((prev) => ({
                        ...prev,
                        [recipe.id]: data.publicUrl,
                    }));
                }
            }));
    

        };
    
        if (recipes.length > 0) {
            fetcher();
        }
    }, [recipes]);
    

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!recipes || recipes.length === 0) {
        return <div>No recipes found for this category</div>;
    }

    // カテゴリー名に基づいて背景色をマッピング
    const categoryStyles: Record<
        string,
        { backgroundColor: string; color: string }
    > = {
        あっさり: { backgroundColor: "#a7d1d1", color: "#fff" },
        さっぱり: { backgroundColor: "#ffb700", color: "#fff" },
        ガッツリ: { backgroundColor: "#e14b00", color: "#fff" },
        ぱぱっと: { backgroundColor: "#201e64", color: "#fff" },
    };

    // 安全なアクセスとデフォルト値の処理
    const style = categoryStyles[categoryName] || {
        backgroundColor: "#fff",
        color: "#000",
    };

    return (
        <div>
            <div>
                <h2
                    style={{
                        backgroundColor: style.backgroundColor,
                        color: style.color,
                    }}
                    className={styles.category_title}
                >
                    {categoryName}
                </h2>
            </div>
            <div className="new-content grid">
                {recipes?.map((recipe) => (
                    <div key={recipe.id} className="item">
                        <Link href={`/recipe/${recipe.id}`}>
                            {thumbnailImageUrl && (
                                <Image
                                    src={thumbnailImageUrl[recipe.id]}
                                    alt={recipe.title}
                                    width={300}
                                    height={200}
                                    priority={true}
                                    style={{ objectFit: "cover" }}
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

export default CategoryList;
