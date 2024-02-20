"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Recipe } from "../../types/recipe";
import { client } from "@/libs/client";
import Loading from "../Loading/Loading";
import Image from "next/image";

const CategoryList = () => {
    const [categories, setCategories] = useState<Recipe[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
    const [categoriesError, setCategoriesError] = useState<Error | null>(null);

    // カテゴリー一覧の取得
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await client.getList({
                    endpoint: "category",
                });
                setCategories(response.contents);
                setCategoriesLoading(false);
            } catch (error) {
                setCategoriesError(error as Error);
                setCategoriesLoading(false);
            }
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
                                src={img(category.title)}
                                alt={category.title}
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
