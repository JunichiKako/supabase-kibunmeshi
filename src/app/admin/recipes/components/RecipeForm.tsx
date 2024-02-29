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
    setThumbnailUrl: (thumbnailUrl: string | null) => void;
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
    onDelete?: () => Promise<void> | void; // onDelete プロパティを追加
};

const PostForm: React.FC<PostFormProps> = ({
    mode,
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
    onDelete,
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
        <div className={styles.editContainer}>
            <button type="submit" className={styles.edit_submitButton}>
                {mode === "new" ? "レシピ作成" : "レシピ更新"}
            </button>
            {mode === "edit" && (
                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={onDelete}
                >
                    レシピ削除
                </button>
            )}
        </div>
    </form>
);

export default PostForm;
