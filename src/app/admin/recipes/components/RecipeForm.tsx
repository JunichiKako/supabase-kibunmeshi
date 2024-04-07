"use client";

import { Material } from "../../../types/recipe";
import UploadForm from "./UploadForm";
import SelectCategory from "./SelectCategory";
import MaterialsForm from "./MaterialsForm";
import ProcessForm from "./ProcessForm";

type PostFormProps = {
    mode: "new" | "edit";
    title: string;
    setTitle: (title: string) => void;
    thumbnailImageKey: string | null;
    setThumbnailImageKey: (thumbnailImageKey: string | null) => void;
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
    onDelete?: () => Promise<void> | void;
};

const PostForm: React.FC<PostFormProps> = ({
    mode,
    title,
    setTitle,
    thumbnailImageKey,
    setThumbnailImageKey,
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
}) => {
    return (
        <form onSubmit={handleSubmit} className="recipe-postform">
            <h2 className="recipe-postform__title">レシピ投稿</h2>

            <div className="title-container">
                <label>タイトル :</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                />
            </div>

            <UploadForm
                thumbnailImageKey={thumbnailImageKey}
                setThumbnailImageKey={setThumbnailImageKey}
            />

            <SelectCategory
                categoryId={categoryId}
                setCategoryId={setCategoryId}
            />

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
            <div className="edit-container">
                <button type="submit" className="edit-container__submitbtn">
                    {mode === "new" ? "レシピ作成" : "レシピ更新"}
                </button>
                {mode === "edit" && (
                    <button
                        type="button"
                        className="edit-container__deletebtn"
                        onClick={onDelete}
                    >
                        レシピ削除
                    </button>
                )}
            </div>
        </form>
    );
};

export default PostForm;
