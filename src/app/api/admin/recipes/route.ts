import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { RecipeData } from "../../../types/recipe";

const prisma = new PrismaClient();

// レシピ投稿のAPI
export const POST = async (req: NextRequest) => {
    try {
        const body: RecipeData = await req.json();
        const { title, thumbnailUrl, categoryId, materials, howTos } = body;

        // categoryId の検証
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            throw new Error(`Category with ID ${categoryId} does not exist.`);
        }

        // レシピと関連データの作成
        const data = await prisma.recipe.create({
            data: {
                title,
                thumbnailUrl,
                categoryId,
                materials: {
                    create: materials,
                },
                howTos: {
                    create: howTos.map((howTo, index) => ({
                        ...howTo,
                        index, // ここで手順のindexを設定
                    })),
                },
            },
        });

        // レスポンスを返す
        return NextResponse.json({
            status: "OK",
            message: "作成しました",
            id: data.id,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({
                status: "エラー",
                message:
                    error instanceof Error ? error.message : "不明なエラー",
            }),
            { status: 400 }
        );
    }
};

// 管理者画面のレシピ一覧取得のAPI
export const GET = async (request: NextRequest) => {
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                category: true, // カテゴリ情報を含める
                materials: true, // 材料情報を含める
                howTos: true, // 調理手順を含める
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(
            { status: "OK", recipes: recipes },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json(
                { status: error.message },
                { status: 400 }
            );
    }
};
