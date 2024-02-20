import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { title, thumbnailUrl, categories, materials, howTos } = body;

        // レシピと関連データの作成
        const data = await prisma.recipe.create({
            data: {
                title,
                thumbnailUrl,
                materials: {
                    create: materials,
                },
                howTos: {
                    create: howTos,
                },
            },
        });

        // 記事とカテゴリーの中間テーブルのレコードをDBに生成
        // 本来複数同時生成には、createManyというメソッドがあるが、sqliteではcreateManyが使えないので、for文1つずつ実施
        for (const category of categories) {
            await prisma.recipeCategory.create({
                data: {
                    categoryId: category.id,
                    recipeId: data.id,
                },
            });
        }

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
