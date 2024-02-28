import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
    try {
        // カテゴリーの一覧をDBから取得
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: "desc", // 作成日時の降順で取得
            },
        });

        // レスポンスを返す
        return NextResponse.json({ status: "OK", categories }, { status: 200 });
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json(
                { status: error.message },
                { status: 400 }
            );
    }
};
