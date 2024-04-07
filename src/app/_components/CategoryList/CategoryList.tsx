"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { Category } from "../../types/recipe";

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();

                setCategories(data.categories);
            } catch (error) {
                setCategoriesError(
                    error instanceof Error
                        ? error
                        : new Error("カテゴリーの取得に失敗しました。")
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

    // 画像のパスを取得する関数
    const getCategoryImagePath = (title: string) => {
        switch (title) {
            case "あっさり":
                return "/images/category/assari.png";
            case "さっぱり":
                return "/images/category/sappari.png";
            case "ガッツリ":
                return "/images/category/gatturi.png";
            case "ぱぱっと":
                return "/images/category/papatto.png";
            default:
                return "/images/category/default.png";
        }
    };

    // 背景色を取得する関数
    const getCategoryBackgroundColor = (title: string) => {
        switch (title) {
            case "あっさり":
                return "#a7d1d1";
            case "さっぱり":
                return "#ffb700";
            case "ガッツリ":
                return "#e14b00";
            case "ぱぱっと":
                return "#201e64";
            default:
                return "#cccccc"; // デフォルトの背景色
        }
    };

    return (
        <div className="category-block" id="category">
            <div className="category-block__title">#Category</div>
            <div className="category-content">
                {categories.map((category) => {
                    // ここで画像のパスと背景色取得
                    const imagePath = getCategoryImagePath(category.name);
                    const backgroundColor = getCategoryBackgroundColor(
                        category.name
                    );
                    return (
                        <Link
                            href={`/category/${category.id}`}
                            key={category.id}
                        >
                            <div
                                key={category.id}
                                className="category-content__item"
                                style={{ backgroundColor }}
                            >
                                <Image
                                    src={imagePath}
                                    alt={category.name}
                                    width={160}
                                    height={40}
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryList;
