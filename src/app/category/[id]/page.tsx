"use client";

import "./category.css";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Recipe } from "../../types/recipe";
import Link from "next/link";
import Loading from "@/app/_components/Loading/Loading";
import Image from "next/image";

const CategoryList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [categoryName, setCategoryName] = useState(""); // カテゴリー名を状態として追加

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
        <div className="recipes-list">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe-item">
                    <Link href={`/recipe/${recipe.id}`}>
                        {recipe.thumbnailUrl && (
                            <Image
                                src={recipe.thumbnailUrl}
                                alt={recipe.title}
                                width={300}
                                height={200}
                                layout="responsive"
                            />
                        )}
                        <h3>{recipe.title}</h3>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
