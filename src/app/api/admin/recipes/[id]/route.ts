import { NextRequest, NextResponse } from "next/server";
import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    try {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                recipeCategories: {
                    include: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                materials: true, // 材料を含める場合
                howTos: true, // 調理手順を含める場合
            },
        });

        return NextResponse.json(
            { status: "OK", recipe: recipe },
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

// PUTという命名にすることで、PUTリクエストの時にこの関数が呼ばれる
export const PUT = async (
    request: NextRequest,
    { params }: { params: { id: string } } // ここでリクエストパラメータを受け取る
) => {
    // paramsの中にidが入っているので、それを取り出す
    const { id } = params;

    // リクエストのbodyを取得
    const { title, thumbnailUrl, categories, materials, howTos } =
        await request.json();

    try {
        // idを指定して、Recipeを更新
        const recipe = await prisma.recipe.update({
            where: {
                id: parseInt(id),
            },
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

        // 一旦、記事とカテゴリーの中間テーブルのレコードを全て削除
        await prisma.recipeCategory.deleteMany({
            where: {
                recipeId: parseInt(id),
            },
        });

        // 記事とカテゴリーの中間テーブルのレコードをDBに生成
        // 本来複数同時生成には、createManyというメソッドがあるが、sqliteではcreateManyが使えないので、for文1つずつ実施
        for (const category of categories) {
            await prisma.recipeCategory.create({
                data: {
                    recipeId: recipe.id,
                    categoryId: category.id,
                },
            });
        }

        // レスポンスを返す
        return NextResponse.json(
            { status: "OK", recipe: recipe },
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
