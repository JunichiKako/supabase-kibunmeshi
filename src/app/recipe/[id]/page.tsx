"use client";
import "./recipe-detail.css";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "@/libs/client";
import { Recipe } from "../../types/recipe";
import Loading from "@/app/_components/Loading/Loading";
import Image from "next/image";

export default function RecipeDetail() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const { id } = useParams();

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await client.get({
                    endpoint: "kibunmeshi",
                    contentId: id as string,
                });
                setRecipe(response);
                console.log(response);
            } catch (error) {
                setError(error as Error);
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

    if (!recipe || !recipe.recipes || recipe.recipes.length === 0) {
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
                    style={categoryStyles[recipe.category.title] || {}}
                >
                    {recipe.category.title}
                </div>
            </div>

            {recipe.recipes
                .filter((recipe) => recipe && recipe.img?.url)
                .map((recipe, index) => (
                    <div key={index} className="thumbnail">
                        {recipe.img?.url && (
                            <Image
                                src={recipe.img.url}
                                alt={recipe.name || "Recipe image"}
                                width={700}
                                height={390}
                            />
                        )}
                    </div>
                ))}

            <div className="recipe-material">
                <div className="material">
                    <ul className="material-list">
                        {recipe.recipes
                            .filter(
                                (recipe) =>
                                    recipe && recipe.fieldId === "material"
                            )
                            .map((recipe, index) => (
                                <li key={index}>
                                    <div className="material-name">
                                        {recipe.material}
                                    </div>
                                    <div className="material-quantity">
                                        {recipe.quantity}
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div className="recipe-step">
                <div className="step-content">
                    <ol>
                        {recipe.recipes
                            .filter(
                                (recipe) => recipe && recipe.fieldId === "howTo"
                            )
                            .map((recipe, index) => (
                                <li key={index}>
                                    <div className="step-content-mark">
                                        {index + 1}
                                    </div>
                                    <div
                                        className="step-content-text"
                                        dangerouslySetInnerHTML={{
                                            __html: recipe.howTo || "",
                                        }}
                                    />
                                </li>
                            ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}
