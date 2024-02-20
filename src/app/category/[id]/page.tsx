"use client";

import "./category.css";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "@/libs/client";
import { CategoryData } from "../../types/recipe";
import Link from "next/link";
import Loading from "@/app/_components/Loading/Loading";
import Image from "next/image";

const CategoryList = () => {
    const [data, setData] = useState<CategoryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const { id } = useParams();

    // カテゴリ名に基づくスタイルの型を定義
    type CategoryStyles = Record<
        string,
        { backgroundColor: string; color: string }
    >;

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await client.getList({
                    endpoint: "kibunmeshi",
                    queries: { filters: `category[equals]${id}` },
                });
                setData(response);
                console.log(response);
            } catch (error) {
                setError(error as Error);
            }
            setLoading(false);
        }

        fetchCategory();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // データが存在しない、またはcontents配列が空の場合の処理
    if (!data || !data.contents || data.contents.length === 0) {
        return <div>Recipe not found</div>;
    }

    // カテゴリー名を取得
    const categoryName = data.contents[0].category.title;

    // カテゴリー名に基づいて背景色をマッピング
    const categoryStyles: Record<
        string,
        { backgroundColor: string; color: string }
    > = {
        あっさり: { backgroundColor: "#a7d1d1", color: "#fff" },
        さっぱり: { backgroundColor: "#ffb700", color: "#fff" },
        ガッツリ: { backgroundColor: "#e14b00", color: "#fff" },
        ぱぱっと: { backgroundColor: "#201e64", color: "#fff" },
    };

    // 安全なアクセスとデフォルト値の処理
    const style = categoryStyles[categoryName] || {
        backgroundColor: "#fff",
        color: "#000",
    };

    return (
        <div className="categorydetail-content">
            <h2 className="category-title" style={categoryStyles[categoryName]}>
                #{categoryName}
            </h2>
            <div className="grid">
                {data.contents.map((content) => (
                    <div key={content.id} className="item">
                        <Link href={`/recipe/${content.id}`}>
                            {content.recipes[0] && content.recipes[0].img && (
                                <Image
                                    src={content.recipes[0].img.url}
                                    alt={content.title}
                                    layout="fill"
                                />
                            )}
                            <p>{content.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
