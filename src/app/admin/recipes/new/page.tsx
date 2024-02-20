"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RecipeForm from "../components/RecipeForm";
import { Material } from "../../../types/recipe";

const CreateRecipeForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState(
        'https://placehold.jp/800x400.png'
    );
    const [category, setCategory] = useState<number[]>([]);
    const [materials, setMaterials] = useState<Material[]>([
        { name: "", quantity: "" },
    ]);
    const [howTos, setHowTos] = useState<{ text: string }[]>([{ text: "" }]);
    const router = useRouter();

    const handleSubmit = async (
        title: string,
        thumbnailUrl: string | null,
        categories: string,
        materials: Material[],
        howTos: { text: string }[]
    ) => {
        // フォーム送信処理...
        const response = await fetch("/api/admin/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                thumbnailUrl:
                categories,
                materials,
                howTos,
            }),
        });
        const { id } = await response.json();
        router.push(`/admin/recipes/${id}`);
        alert("レシピを作成しました");
    };

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
                title={title}
                setTitle={setTitle}
                thumbnailUrl={thumbnailUrl}
                setThumbnailUrl={setThumbnailUrl}
                category={category}
                setCategory={setCategory}
                materials={materials}
                setMaterials={setMaterials}
                howTos={howTos}
                setHowTos={setHowTos}
                handleSubmit={() =>
                    handleSubmit(
                        title,
                        thumbnailUrl,
                        category,
                        materials,
                        howTos
                    )
                }
                handleMaterialChange={handleMaterialChange}
                addMaterial={addMaterial}
                removeMaterial={removeMaterial}
                addHowTo={addHowTo}
                removeHowTo={removeHowTo}
                handleHowToChange={handleHowToChange}
            />
        </div>
    );
};

export default CreateRecipeForm;
