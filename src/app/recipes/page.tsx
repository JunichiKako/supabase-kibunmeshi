"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Loading from "../_components/Loading/Loading";
import { Recipe } from "../types/recipe";
import Image from "next/image";
import { supabase } from "../../utils/supabase";

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9; // 1ページあたりのレシピ数

    // レシピIDをキー、サムネイル画像URLを値とするオブジェクトの状態を用意
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState<{
        [key: number]: string;
    }>({});

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
                setLoading(false);
            }
        }

        fetchData();
    }, [currentPage]);

    // DBに保存しているthumbnailImageKeyを元に、Supabaseから画像のURLを取得する
    useEffect(() => {
        async function fetchRecipeImages() {
            const urlPromises = recipes.map(async (recipe) => {
                if (recipe.thumbnailImageKey) {
                    const { data } = supabase.storage
                        .from("recipe_thumbnail")
                        .getPublicUrl(recipe.thumbnailImageKey);

                    if (!error && data) {
                        // 注意: newImageUrls[recipe.id] への代入はここでは行わない
                        return { id: recipe.id, url: data.publicUrl };
                    }
                }
                return { id: recipe.id, url: null };
            });

            const urls = await Promise.all(urlPromises);
            const newImageUrls = urls.reduce(
                (acc, curr) => {
                    if (curr.url) acc[curr.id] = curr.url; // nullでないURLのみを状態に追加
                    return acc;
                },
                { ...thumbnailImageUrl }
            );

            setThumbnailImageUrl(newImageUrls);
        }

        if (recipes.length > 0) {
            fetchRecipeImages();
        }
    }, [recipes,thumbnailImageUrl]);

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
                        className="pagination__btn"
                    >
                        前のページ
                    </button>
                )}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!!(recipes && recipes.length < recipesPerPage)}
                    className="pagination__btn"
                >
                    次のページ
                </button>
            </div>
        );
    };

    return (
        <div>
            <div className="recipes-all-title">#レシピ一覧</div>
            <div className="grid-block">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="grid-block__item">
                        <Link href={`/recipe/${recipe.id}`}>
                            {thumbnailImageUrl && (
                                <Image
                                    src={thumbnailImageUrl[recipe.id]}
                                    alt={recipe.title}
                                    width={300}
                                    height={200}
                                    priority={true}
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
