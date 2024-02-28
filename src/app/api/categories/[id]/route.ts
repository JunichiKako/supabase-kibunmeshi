import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    // paramsの中にidが入っているので、それを取り出す
    const { id } = params;

    try {
        // カテゴリーIDを元に、そのカテゴリーに属する全てのレシピを取得
        const categoryWithPosts = await prisma.category.findUnique({
            where: {
                id: parseInt(id),
            },
            // 関連するレシピも含めて取得
            include: {
                recipes: true, // この部分を追加・変更
            },
        });

        // レスポンスを返す
        return NextResponse.json(
            { status: "OK", category: categoryWithPosts },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { status: "error", message: error.message },
                { status: 400 }
            );
        }
    }
};
