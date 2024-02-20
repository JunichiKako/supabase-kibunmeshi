// SelectCategory.tsx
import React from "react";
import styles from "../new/CreateRecipeForm.module.css"; // スタイルモジュールのパスを適宜設定してください。

type SelectCategoryProps = {
    categoryId: number; // 選択されたカテゴリーID
    setCategoryId: React.Dispatch<React.SetStateAction<number>>; // カテゴリーIDを更新する関数
};

const SelectCategory: React.FC<SelectCategoryProps> = ({
    categoryId,
    setCategoryId,
}) => {
    return (
        <div className={styles.categoryContainer}>
            <label>カテゴリ:</label>
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className={styles.selectField}
            >
                <option value="0">カテゴリを選択</option>
                <option value="1">デザート</option>
                <option value="2">メインディッシュ</option>
                <option value="3">サイドディッシュ</option>
            </select>
        </div>
    );
};

export default SelectCategory;
