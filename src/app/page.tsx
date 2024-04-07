"use client";

import { useRecipes } from "./_hooks/useRecipes";
import Loading from "./_components/Loading/Loading";
import Link from "next/link";
import Image from "next/image";
import CategoryList from "./_components/CategoryList/CategoryList";
import SearchRecipe from "./_components/SearchRecipe/SearchRecipe";
import MenuBtn from "./_components/MenuBtn/MenuBtn";

export default function Home() {
    const { recipes, thumbnailUrls, isLoading, error } = useRecipes();

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <MenuBtn />
            <SearchRecipe />
            <div className="grid-block">
                {recipes &&
                    recipes.map((recipe) => (
                        <div key={recipe.id} className="grid-block__item">
                            <Link href={`/recipe/${recipe.id}`}>
                                {thumbnailUrls[recipe.id] ? (
                                    <Image
                                        src={thumbnailUrls[recipe.id]}
                                        alt={recipe.title}
                                        width={300}
                                        height={200}
                                        priority={true}
                                    />
                                ) : (
                                    <div>レシピ画像が設定されていません</div>
                                )}
                                <p>{recipe.title}</p>
                            </Link>
                        </div>
                    ))}
            </div>

            <div className="recipe_all">
                <Link href="/recipes">
                    <div className="recipe_all__btn">
                        レシピ一覧はこちらから
                    </div>
                </Link>
            </div>

            <CategoryList />
        </>
    );
}
