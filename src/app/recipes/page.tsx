"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { client } from "@/libs/client";
import "./recipes.css";
import Loading from "../_components/Loading/Loading";
import { Recipe } from "../types/recipe";
import Image from "next/image";

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9; // 1ページあたりのレシピ数

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `/api/recipes?limit=${recipesPerPage}&offset=${
                        (currentPage - 1) * recipesPerPage
                    }`
                );
                const data = await response.json();
                setRecipes(data);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        }

        fetchData();
    }, [currentPage]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error</div>;
    }

    // 次のページへ移動したときにページのトップにスクロール
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };

    // ページネーション
    const renderPagiantion = () => {
        return (
            <div className="pagination">
                {currentPage > 1 && (
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        前のページ
                    </button>
                )}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!!(recipes && recipes.length < recipesPerPage)}
                >
                    次のページ
                </button>
            </div>
        );
    };

    return (
        <div>
            <div className="recipes-title">#レシピ一覧</div>
            <div className="new-content grid">
                {recipes?.map((recipe) => (
                    <div key={recipe.id} className="item">
                        <Link href={`/recipe/${recipe.id}`}>
                            {recipe.thumbnailUrl && (
                                <Image
                                    src={recipe.thumbnailUrl}
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
            {renderPagiantion()}
        </div>
    );
}
