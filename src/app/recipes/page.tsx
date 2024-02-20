"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { client } from "@/libs/client";
import "./recipes.css";
import Loading from "../_components/Loading/Loading";
import { RecipeList, Recipe } from "../types/recipe";
import Image from "next/image";

export default function Recipes() {
    const [recipes, setRecipes] = useState<RecipeList | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9; // 1ページあたりのレシピ数

    useEffect(() => {
        async function fetchData() {
            try {
                // APIからデータを取得
                const response = await client.getList({
                    endpoint: "kibunmeshi",
                    queries: {
                        limit: recipesPerPage,
                        offset: (currentPage - 1) * recipesPerPage,
                    },
                });
                setRecipes(response);
                setLoading(false);
            } catch (error) {
                // エラーを処理
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
                    disabled={
                        !!(recipes && recipes.contents.length < recipesPerPage)
                    }
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
                {recipes?.contents.map((content) => (
                    <div key={content.id} className="item">
                        <Link href={`/recipe/${content.id}`}>
                            {content.recipes[0]?.img?.url && (
                                <Image
                                    src={content.recipes[0].img.url}
                                    alt={content.title}
                                    width={300}
                                    height={200}
                                    priority={true}
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                            <p>{content.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
            {renderPagiantion()}
        </div>
    );
}
