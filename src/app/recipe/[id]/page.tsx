"use client";
import "./recipe-detail.css";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Recipe } from "../../types/recipe";
import Loading from "@/app/_components/Loading/Loading";
import Image from "next/image";

export default function RecipeDetail() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const { id } = useParams();

    useEffect(() => {
        async function fetchRecipe() {
            try {
                if (!id) return; // idがない場合は早期リターン
                const response = await fetch(`/api/recipes/${id}`); // APIのURLを修正
                const data = await response.json();
                setRecipe(data.recipe);
                console.log(data);
                
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
        <div className="recipe-content">
            <div className="recipe-header">
                <h2 className="recipe-title">{recipe.title}</h2>
                <div
                    className="category-title"
                    style={categoryStyles[recipe.category.name] || {}}
                >
                    {recipe.category.name}
                </div>
            </div>

            {recipe.thumbnailUrl && (
                <div className="thumbnail">
                    <Image
                        src={recipe.thumbnailUrl}
                        alt={recipe.title || "Recipe image"}
                        width={700}
                        height={390}
                    />
                </div>
            )}
            <div className="recipe-material">
                <ul className="material-list">
                    {recipe.materials.map((material, index) => (
                        <li key={index}>
                            <div className="material-name">{material.name}</div>
                            <div className="material-quantity">
                                {material.quantity}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="recipe-step">
                <ol>
                    {recipe.howTos.map((howTo, index) => (
                        <li key={index}>
                            <div className="step-content-mark">{index + 1}</div>
                            <div
                                className="step-content-text"
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
