
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";

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
            return;
        }

        const file = event.target.files[0];

        const filePath = `private/${uuidv4()}`; 

        const { data, error } = await supabase.storage
            .from("recipe_thumbnail")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });


        if (error) {
            alert(error.message);
            return;
        }

        
        setThumbnailImageKey(data.path);
    };

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
        <div className="thumbnail-container">
            <div className="thumbnail-container__inputBox">
                <label htmlFor="thumbnailImageKey">サムネイル画像:</label>
                <input
                    type="file"
                    id="thumbnailImageKey"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            {thumbnailImageUrl && (
                <div className="thumbnail-preview">
                    <Image
                        src={thumbnailImageUrl}
                        alt="サムネイルプレビュー"
                        width={288} 
                        height={288} 
                        layout="responsive"
                        style={{borderRadius: "10px"}}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadForm;
