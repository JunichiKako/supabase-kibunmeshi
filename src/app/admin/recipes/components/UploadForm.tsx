import React from "react";
import styles from "../new/CreateRecipeForm.module.css";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { useState, ChangeEvent, useEffect } from "react";

type UploadFormProps = {
    thumbnailImageKey: string | null;
    setThumbnailImageKey: (key: string | null) => void;
};

const UploadForm: React.FC<UploadFormProps> = ({
    thumbnailImageKey,
    setThumbnailImageKey,
}) => {
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | null>(
        null
    );

    const handleImageChange = async (
        event: ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        if (!event.target.files || event.target.files.length == 0) {
            // 画像が選択されていないのでreturn
            return;
        }

        // eventから画像を取得
        const file = event.target.files[0]; // 選択された画像を取得

        // private/は必ずつけること
        const filePath = `private/${uuidv4()}`; // ファイル名を指定

        // Supabase Storageに画像をアップロード
        const { data, error } = await supabase.storage
            .from("recipe_thumbnail")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        // アップロードに失敗したらエラーを表示
        if (error) {
            alert(error.message);
            return;
        }

        // data.pathに画像のパスが格納されているので、thumbnailImageKeyに格納
        setThumbnailImageKey(data.path);
    };

    // DBに保存しているthumbnailImageKeyを元に、Supabaseから画像のURLを取得する
    useEffect(() => {
        if (!thumbnailImageKey) return;

        const fetcher = async () => {
            const {
                data: { publicUrl },
            } = await supabase.storage
                .from("recipe_thumbnail")
                .getPublicUrl(thumbnailImageKey);

            setThumbnailImageUrl(publicUrl);
        };

        fetcher();
    }, [thumbnailImageKey]);

    return (
        <div className={styles.thumbnailContainer}>
            <div className={styles.thumbnailInputContainer}>
                <label htmlFor="thumbnailImageKey">サムネイル画像:</label>
                <input
                    type="file"
                    id="thumbnailImageKey"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.inputField}
                />
            </div>
            {thumbnailImageUrl && (
                <div>
                    <img
                        src={thumbnailImageUrl}
                        alt="サムネイルプレビュー"
                        className={styles.thumbnailPreview}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadForm;
