"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { Category } from "../../types/recipe";
import styles from "./CategoryList.module.css";

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
    const [categoriesError, setCategoriesError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/categories"); // APIエンドポイントへのパスを指定
                const data = await response.json();

                setCategories(data.categories);
            } catch (error) {
                setCategoriesError(
                    error instanceof Error
                        ? error
                        : new Error("An error occurred")
                );
            }
            setCategoriesLoading(false);
        }

        fetchData();
    }, []);

    if (categoriesLoading) {
        return <Loading />;
    }

    if (categoriesError) {
        return <div>Error</div>;
    }

    // カテゴリー画像の設定関数を修正
    const getCategoryStyle = (title: string) => {
        switch (title) {
            case "あっさり":
                return {
                    img: "/images/category/assari.png",
                    className: styles.assari,
                };
            case "さっぱり":
                return {
                    img: "/images/category/sappari.png",
                    className: styles.sappari,
                };
            case "ガッツリ":
                return {
                    img: "/images/category/gatturi.png",
                    className: styles.gatturi,
                };
            case "ぱぱっと":
                return {
                    img: "/images/category/papatto.png",
                    className: styles.papatto,
                };
            default:
                // デフォルトの画像とスタイルを返す
                return {
                    img: "/images/category/default.png",
                    className: styles.default,
                };
        }
    };
    return (
        <div id="category">
            <div className={styles.category_title}>#Category</div>
            <div className={styles.category_content}>
                {categories.map((category) => {
                    // カテゴリー名に基づいて画像とスタイルを取得
                    const { img: categoryImage, className: categoryClassName } =
                        getCategoryStyle(category.name);

                    return (
                        <div className={categoryClassName} key={category.id}>
                            <Link
                                href={`/category/${category.id}`}
                                className={styles.category_item}
                            >
                                <Image
                                    src={categoryImage}
                                    alt={category.name}
                                    width={140}
                                    height={150}
                                    priority={true}
                                    className={styles.category_image}
                                />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryList;
