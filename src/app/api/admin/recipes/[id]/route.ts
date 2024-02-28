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
                category: true,
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
    const { title, thumbnailUrl, categoryId, materials, howTos } =
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
                categoryId,
                materials: {
                    create: materials,
                },
                howTos: {
                    create: howTos,
                },
            },
        });

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
