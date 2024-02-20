// RecipeForm.tsx
"use client";

import React from "react";
import styles from "../new/CreateRecipeForm.module.css";
import { Material } from "../../../types/recipe";
import UploadForm from "./UploadForm";
import SelectCategory from "./SelectCategory";
import MaterialsForm from "./MaterialsForm";
import ProcessForm from "./ProcessForm";

// PostFormに必要なpropsの型定義
type PostFormProps = {
    mode: "new" | "edit";
    title: string;
    setTitle: (title: string) => void;
    thumbnailUrl: string | null;
    setThumbnailUrl: (thumbnailUrl: string) => void;
    categoryId: number;
    setCategoryId: (categoryId: number) => void;
    materials: Material[];
    setMaterials: (materials: Material[]) => void;
    howTos: { text: string }[];
    setHowTos: (howTos: { text: string }[]) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleMaterialChange: (
        index: number,
        field: keyof Material,
        value: string
    ) => void;
    addMaterial: () => void;
    removeMaterial: (index: number) => void;
    addHowTo: () => void;
    removeHowTo: (index: number) => void;
    handleHowToChange: (index: number, newText: string) => void;
};

const PostForm: React.FC<PostFormProps> = ({
    title,
    setTitle,
    thumbnailUrl,
    setThumbnailUrl,
    categoryId,
    setCategoryId,
    materials,
    setMaterials,
    howTos,
    setHowTos,
    handleSubmit,
    handleMaterialChange,
    addMaterial,
    removeMaterial,
    addHowTo,
    removeHowTo,
    handleHowToChange,
}) => (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.formTitle}>レシピ投稿</h2>

        <div className={styles.titleContainer}>
            <label>タイトル :</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.inputField}
            />
        </div>

        <UploadForm
            thumbnailUrl={thumbnailUrl}
            setThumbnailUrl={setThumbnailUrl}
        />

        <SelectCategory categoryId={categoryId} setCategoryId={setCategoryId} />    

        <MaterialsForm
            materials={materials}
            handleMaterialChange={handleMaterialChange}
            addMaterial={addMaterial}
            removeMaterial={removeMaterial}
        />

        <ProcessForm
            howTos={howTos}
            addHowTo={addHowTo}
            removeHowTo={removeHowTo}
            handleHowToChange={handleHowToChange}
        />

        <button type="submit" className={styles.submitButton}>
            レシピを作成
        </button>
    </form>
);

export default PostForm;
