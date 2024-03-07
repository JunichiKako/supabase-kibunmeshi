"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Recipe } from "../../types/recipe";
import Loading from "@/app/_components/Loading/Loading";
import Image from "next/image";
import styles from "./Recipe_detail.module.css";
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
                if (!id) return; // idがない場合は早期リターン
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

    // DBに保存しているthumbnailImageKeyを元に、Supabaseから画像のURLを取得する
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
        <div>
            <div className={styles.recipe_header}>
                <h2 className={styles.recipe_title}>{recipe.title}</h2>
                <div
                    className={styles.category_title}
                    style={categoryStyles[recipe.category.name] || {}}
                >
                    {recipe.category.name}
                </div>
            </div>

            {thumbnailImageUrl && (
                <div className={styles.thumbnail}>
                    <Image
                        src={thumbnailImageUrl}
                        alt={recipe.title || "Recipe image"}
                        width={700}
                        height={390}
                        className={styles.thumbnail_img}
                    />
                </div>
            )}
            <div className={styles.recipe_material}>
                <p className={styles.material_title}>材料・分量</p>
                <ul className="material-list">
                    {recipe.materials.map((material, index) => (
                        <li key={index} className={styles.material_item}>
                            <div className="material-name">{material.name}</div>
                            <div className="material-quantity">
                                {material.quantity}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.recipe_step}>
                <p className={styles.step_title}>作り方</p>
                <ol>
                    {recipe.howTos.map((howTo, index) => (
                        <li key={index} className={styles.step_list}>
                            <div className={styles.step_content_mark}>
                                {index + 1}
                            </div>
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
