"use client";

import MenuBtn from "@/app/_components/MenuBtn/MenuBtn";
import React from "react";
import { useEffect, useState } from "react";
import { RecipeData } from "../../types/recipe";
import Link from "next/link";
import styles from "./adminRecipeList.module.css";

const Page = () => {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);

    useEffect(() => {
        const fetcher = async () => {
            const res = await fetch("/api/admin/recipes");
            const { recipes } = await res.json();
            setRecipes(recipes);
        };

        fetcher();
    }, []);

    // 日付をフォーマットする関数（例：2024-02-28T04:52:05.251Z -> 2024/02/28）
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div>
            <MenuBtn />
            <h2>管理者用レシピページ</h2>
            <ul className={styles.list}>
                {recipes.map((recipe) => (
                    <Link key={recipe.id} href={`/admin/recipes/${recipe.id}`}>
                        <li className={styles.listItem}>
                            <h3 className={styles.title}>{recipe.title}</h3>
                            <p className={styles.category}>
                                カテゴリ: {recipe.category.name}
                            </p>
                            <p className={styles.createdAt}>
                                作成日: {formatDate(recipe.createdAt)}
                            </p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Page;
