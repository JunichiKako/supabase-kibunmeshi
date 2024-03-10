import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Recipe, Material, HowTo } from "../../../../types/recipe";
import { getCurrentUser } from "@/utils/supabase";

// PUTリクエストで受け取るリクエストボディの型を定義
interface UpdateRecipeRequestBody {
    title: string;
    thumbnailImageKey: string;
    categoryId: number;
    materials: Material[];
    howTos: HowTo[];
}

const prisma = new PrismaClient();

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { currentUser, error } = await getCurrentUser(request);

    if (error)
        return NextResponse.json({ status: error.message }, { status: 400 });

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
    { params }: { params: { id: string } }
) => {
    const { currentUser, error } = await getCurrentUser(request);

    if (error)
        return NextResponse.json({ status: error.message }, { status: 400 });

    const { id } = params;
    const {
        title,
        thumbnailImageKey,
        categoryId,
        materials: clientMaterials,
        howTos: clientHowTos,
    }: UpdateRecipeRequestBody = await request.json();

    // トランザクションの開始
    const transaction = await prisma.$transaction(async (prisma) => {
        // 既存の材料（Materials）と手順（HowTos）の処理
        const existingMaterialsIds = clientMaterials
            .map((material) => material.id)
            .filter((id): id is number => id !== undefined); // `id` が `number` 型のもののみを残す

        const existingHowTosIds = clientHowTos
            .map((howTo) => howTo.id)
            .filter((id): id is number => id !== undefined); // `id` が `number` 型のもののみを残す

        // 不要になった項目の削除
        await prisma.material.deleteMany({
            where: {
                AND: [
                    { recipeId: parseInt(id) },
                    { id: { notIn: existingMaterialsIds } },
                ],
            },
        });

        await prisma.howTo.deleteMany({
            where: {
                AND: [
                    { recipeId: parseInt(id) },
                    { id: { notIn: existingHowTosIds } },
                ],
            },
        });

        // 更新が必要な既存項目の更新
        await Promise.all(
            clientMaterials
                .filter((material) => material.id !== undefined)
                .map((material) =>
                    prisma.material.update({
                        where: { id: material.id },
                        data: {
                            name: material.name,
                            quantity: material.quantity,
                        },
                    })
                )
        );

        await Promise.all(
            clientHowTos
                .filter((howTo) => howTo.id !== undefined)
                .map((howTo) =>
                    prisma.howTo.update({
                        where: { id: howTo.id },
                        data: { text: howTo.text, index: howTo.index },
                    })
                )
        );

        // 新しい項目の追加
        const newMaterials = clientMaterials.filter(
            (material) => material.id === undefined
        );
        const newHowTos = clientHowTos.filter(
            (howTo) => howTo.id === undefined
        );

        await prisma.material.createMany({
            data: newMaterials.map((material) => ({
                name: material.name,
                quantity: material.quantity,
                recipeId: parseInt(id),
            })),
        });

        await prisma.howTo.createMany({
            data: newHowTos.map((howTo) => ({
                text: howTo.text,
                index: howTo.index,
                recipeId: parseInt(id),
            })),
        });

        // レシピの基本情報を更新
        return prisma.recipe.update({
            where: { id: parseInt(id) },
            data: {
                title,
                thumbnailImageKey,
                categoryId,
            },
            include: {
                materials: true,
                howTos: true,
            },
        });
    });

    // トランザクションの結果をレスポンスとして返す
    return NextResponse.json(
        { status: "OK", recipe: transaction },
        { status: 200 }
    );
};

// ...

// DELETEという命名にすることで、DELETEリクエストの時にこの関数が呼ばれる
export const DELETE = async (
    request: NextRequest,
    { params }: { params: { id: string } } // ここでリクエストパラメータを受け取る
) => {
    const { currentUser, error } = await getCurrentUser(request);

    if (error)
        return NextResponse.json({ status: error.message }, { status: 400 });
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
