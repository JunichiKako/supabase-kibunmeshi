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

    // リクエストのbodyの型を定義

    // リクエストのbodyを取得
    const { title, thumbnailUrl, categoryId, materials, howTos } =
        await request.json();

    await prisma.material.deleteMany({
        where: {
            id: {
                in: materials
                    .map((material: any) => material.id)
                    .filter((id: any) => id !== undefined),
            },
        },
    });

    await prisma.howTo.deleteMany({
        where: {
            id: {
                in: howTos
                    .map((howTo: any) => howTo.id)
                    .filter((id: any) => id !== undefined),
            },
        },
    });

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
                    create: materials.map((material: any) => ({
                        name: material.name,
                        quantity: material.quantity,
                    })),
                },
                howTos: {
                    create: howTos.map((howTo: any, index: any) => ({
                        index: index,
                        text: howTo.text,
                    })),
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

// DELETEという命名にすることで、DELETEリクエストの時にこの関数が呼ばれる
export const DELETE = async (
    request: NextRequest,
    { params }: { params: { id: string } } // ここでリクエストパラメータを受け取る
) => {
    // paramsの中にidが入っているので、それを取り出す
    const { id } = params;

    try {
        // idを指定して、Postを削除
        await prisma.recipe.delete({
            where: {
                id: parseInt(id),
            },
        });

        // レスポンスを返す
        return NextResponse.json({ status: "OK" }, { status: 200 });
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json(
                { status: error.message },
                { status: 400 }
            );
    }
};
