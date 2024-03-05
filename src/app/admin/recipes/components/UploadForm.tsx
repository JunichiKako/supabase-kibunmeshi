// UploadForm.tsx
import React from "react";
import styles from "../new/CreateRecipeForm.module.css"; // スタイルモジュールのパスを適宜設定してください。

// UploadForm のプロパティの型を定義
type UploadFormProps = {
    thumbnailUrl: string | null; // サムネイルのURL（または未設定の場合は null）
    setThumbnailUrl: (url: string | null) => void; // サムネイルURLを更新する関数
};

const UploadForm: React.FC<UploadFormProps> = ({
    thumbnailUrl,
    setThumbnailUrl,
}) => {
    const handleSetThumbnailUrl = (url: string | null) => {
        // URLがnullでなければ、そのURLを設定する
        if (url) {
            setThumbnailUrl(url);
        } else {
            return; 
        }
    };
    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleSetThumbnailUrl(URL.createObjectURL(file));
        } else {
            // ファイルが選択されていない、または選択が解除された場合に null を扱う
            handleSetThumbnailUrl(null);
        }
    };

    return (
        <div className={styles.thumbnailContainer}>
            <div className={styles.thumbnailInputContainer}>
                <label htmlFor="thumnailImageKey">サムネイル画像:</label>
                <input
                    type="file"
                    id="thumnailImageKey"
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
