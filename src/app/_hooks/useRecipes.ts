import useSWR from "swr";
import { useState, useEffect } from "react";
import { Recipe } from "../types/recipe";
import { supabase } from "../../utils/supabase";

async function fetcher(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("読み込みエラーが発生しました。ページをリロードしてください。");
    }
    return response.json();
}

export const useRecipes = () => {
    const { data, error, isValidating } = useSWR<Recipe[]>(
        "/api/recipes",
        fetcher
    );
    const [thumbnailUrls, setThumbnailUrls] = useState<{
        [key: string]: string;
    }>({});

    useEffect(() => {
        if (data) {
            const fetchThumbnails = async () => {
                const urls: { [key: string]: string } = {};
                await Promise.all(
                    data.map(async (recipe) => {
                        if (recipe.thumbnailImageKey) {
                            const { data: imageData } = await supabase.storage
                                .from("recipe_thumbnail")
                                .getPublicUrl(recipe.thumbnailImageKey);
                            if (!error && imageData) {
                                urls[recipe.id.toString()] =
                                    imageData.publicUrl;
                            }
                        }
                    })
                );
                setThumbnailUrls(urls);
            };

            fetchThumbnails();
        }
    }, [data]);

    return {
        recipes: data,
        thumbnailUrls,
        isLoading: isValidating,
        error,
    };
};
