import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
    try {
        const searchQuery = req.nextUrl.searchParams.get("search");

        let whereClause = {};

        if (searchQuery) {
            whereClause = {
                OR: [
                    {
                        name: {
                            contains: searchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: searchQuery,
                            mode: "insensitive",
                        },
                    },
                    // 他の検索条件があればここに追加
                ],
            };
        }

        const recipes = await prisma.recipe.findMany({
            where: whereClause,
            include: {
                category: true,
                materials: true,
                howTos: true,
            },
        });

        return NextResponse.json(recipes);
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({
                status: "エラー",
                message:
                    error instanceof Error ? error.message : "不明なエラー",
            }),
            { status: 500 }
        );
    }
};
