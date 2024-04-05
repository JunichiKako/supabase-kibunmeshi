"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Recipe } from "../../types/recipe";
import Loading from "@/app/_components/Loading/Loading";
import Image from "next/image";
import { supabase } from "../../../utils/supabase";

export default function RecipeDetail() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
        null
    );

    const { id } = useParams();

    useEffect(() => {
        async function fetchRecipe() {
            try {
                if (!id) return; 
                const response = await fetch(`/api/recipes/${id}`); // APIのURLを修正
                const data = await response.json();
                setRecipe(data.recipe);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error
                        : new Error("An error occurred")
                );
            }
            setLoading(false);
        }

        fetchRecipe();
    }, [id]);

   
    useEffect(() => {
        if (!recipe?.thumbnailImageKey) return;

        const fetcher = async () => {
            const {
                data: { publicUrl },
            } = await supabase.storage
                .from("recipe_thumbnail")
                .getPublicUrl(recipe.thumbnailImageKey);

            setThumbnailImageUrl(publicUrl);
        };
        fetcher();
    }, [recipe?.thumbnailImageKey]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    // カテゴリタイトルに基づく背景色のマッピング
    const categoryStyles: {
        [key: string]: { backgroundColor: string; color: string };
    } = {
        あっさり: { backgroundColor: "#a7d1d1", color: "#fff" },
        さっぱり: { backgroundColor: "#ffb700", color: "#fff" },
        ガッツリ: { backgroundColor: "#e14b00", color: "#fff" },
        ぱぱっと: { backgroundColor: "#201e64", color: "#fff" },
    };

    return (
        <div className="recipe-detail">
            <div className="recipe-detail__header">
                <h2 className="recipe-detail__title">{recipe.title}</h2>
                <div
                    className="category__title"
                    style={categoryStyles[recipe.category.name] || {}}
                >
                    {recipe.category.name}
                </div>
            </div>

            {thumbnailImageUrl && (
                <div className="recipe-detail__thumbnail">
                    <Image
                        src={thumbnailImageUrl}
                        alt={recipe.title || "Recipe image"}
                        width={700}
                        height={390}
                        priority={true}
                    />
                </div>
            )}
            <div className="recipe-material">
                <p className="recipe-material__title">材料・分量</p>
                <ul className="recipe-material__list">
                    {recipe.materials.map((material, index) => (
                        <li key={index} className="recipe-material__item">
                            <div className="recipe-material__name">{material.name}</div>
                            <div className="recipe-material__quantity">
                                {material.quantity}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="recipe-step">
                <p className="recipe-step__title">作り方</p>
                <ol>
                    {recipe.howTos.map((howTo, index) => (
                        <li key={index} className="recipe-step_list">
                            <div className="recipe-step__mark">
                                {index + 1}
                            </div>
                            <div
                                className="recipe-step__text"
                                dangerouslySetInnerHTML={{
                                    __html: howTo.text || "",
                                }}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
