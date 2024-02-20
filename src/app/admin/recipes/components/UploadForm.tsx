// UploadForm.tsx
import React from "react";
import styles from "../new/CreateRecipeForm.module.css"; // スタイルモジュールのパスを適宜設定してください。

// UploadForm のプロパティの型を定義
type UploadFormProps = {
    thumbnailUrl: string | null; // サムネイルのURL（または未設定の場合は null）
    setThumbnailUrl: (url: string | null) => void; // サムネイルURLを更新する関数
};

const UploadForm: React.FC<UploadFormProps> = ({ thumbnailUrl, setThumbnailUrl }) => {
    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setThumbnailUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className={styles.thumbnailContainer}>
            <div className={styles.thumbnailInputContainer}>
                <label>サムネイル画像:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className={styles.inputField}
                />
            </div>
            {thumbnailUrl && (
                <div>
                    <img
                        src={thumbnailUrl}
                        alt="サムネイルプレビュー"
                        className={styles.thumbnailUrl}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadForm;
