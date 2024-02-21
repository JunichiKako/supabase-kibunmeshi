import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { RecipeData } from "../../../types/recipe";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    try {
        const body: RecipeData = await req.json();
        const { title, thumbnailUrl, categoryId, materials, howTos } = body;

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
