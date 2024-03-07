"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import RecipeForm from "../components/RecipeForm";
import { Material, Recipe } from "../../../types/recipe";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

const CreateRecipeForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [thumbnailImageKey, setThumbnailImageKey] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [materials, setMaterials] = useState([{ name: "", quantity: "" }]);
    const [howTos, setHowTos] = useState<{ text: string }[]>([{ text: "" }]);
    const router = useRouter();
    const { id } = useParams();
    const { token } = useSupabaseSession();

    const handleSubmit = async (e: React.FormEvent<Element>) => {
        // フォーム送信処理...
        e.preventDefault();

        // 記事更新のAPI
        await fetch(`/api/admin/recipes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token!,
            },
            body: JSON.stringify({
                title,
                thumbnailImageKey,
                categoryId,
                materials,
                howTos: {},
            }),
        });
        alert("レシピを更新しました！");
    };

    const handleDeletePost = async () => {
        if (!confirm("記事を削除しますか？")) return;

        await fetch(`/api/admin/recipes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token!,
            },
        });

        alert("記事を削除しました。");

        router.push("/admin/recipes");
    };

    useEffect(() => {
        if (!token) return;
        const fetcher = async () => {
            const res = await fetch(`/api/admin/recipes/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            console.log(res);
            
            const { recipe }: { recipe: Recipe } = await res.json();
            setTitle(recipe.title);
            setThumbnailImageKey(recipe.thumbnailImageKey);
            setCategoryId(recipe.categoryId);
            setMaterials(recipe.materials);
            setHowTos(recipe.howTos);
        };

        fetcher();
    }, [id, token]);

    // マテリアルの変更を扱う関数
    const handleMaterialChange = (
        index: number,
        field: keyof Material,
        value: string
    ) => {
        const updatedMaterials = materials.map((material, materialIndex) =>
            materialIndex === index ? { ...material, [field]: value } : material
        );
        setMaterials(updatedMaterials);
    };

    // マテリアルを追加する関数
    const addMaterial = () => {
        setMaterials([...materials, { name: "", quantity: "" }]);
    };

    // マテリアルを削除する関数
    const removeMaterial = (index: number) => {
        const filteredMaterials = materials.filter(
            (_, materialIndex) => materialIndex !== index
        );
        setMaterials(filteredMaterials);
    };

    // 手順を追加する関数
    const addHowTo = () => {
        setHowTos([...howTos, { text: "" }]);
    };

    const removeHowTo = (index: number) => {
        // 指定されたインデックス以外の要素で新しい配列を作成することで、
        // 特定の手順を削除します。
        const newHowTos = howTos.filter(
            (_, howToIndex) => howToIndex !== index
        );
        setHowTos(newHowTos);
    };

    // 手順のテキストを更新する関数
    const handleHowToChange = (index: number, newText: string) => {
        const updatedHowTos = howTos.map((howTo, howToIndex) =>
            howToIndex === index ? { ...howTo, text: newText } : howTo
        );
        setHowTos(updatedHowTos);
    };

    return (
        <div>
            <RecipeForm
                mode="edit"
                title={title}
                setTitle={setTitle}
                thumbnailImageKey={thumbnailImageKey}
                setThumbnailImageKey={setThumbnailImageKey}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                materials={materials}
                setMaterials={setMaterials}
                howTos={howTos}
                setHowTos={setHowTos}
                handleMaterialChange={handleMaterialChange}
                addMaterial={addMaterial}
                removeMaterial={removeMaterial}
                addHowTo={addHowTo}
                removeHowTo={removeHowTo}
                handleHowToChange={handleHowToChange}
                handleSubmit={handleSubmit}
                onDelete={handleDeletePost}
            />
        </div>
    );
};

export default CreateRecipeForm;
