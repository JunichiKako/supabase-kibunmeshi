"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Category } from "../../types/recipe";
import Loading from "../Loading/Loading";
import Image from "next/image";

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
    const img = (title: string): string => {
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
                // ここでデフォルト画像のパスを返す
                return "/images/category/default.png";
        }
    };
    return (
        <div id="category">
            <div className="c-title">#Category</div>
            <div className="category-content">
                {categories.map((category) => (
                    <div className="item" key={category.id}>
                        <Link href={`/category/${category.id}`}>
                            <Image
                                src={img(category.name)}
                                alt={category.name}
                                width={300}
                                height={200}
                                priority={true}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
