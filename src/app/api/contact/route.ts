// pages/api/contact.ts

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: NextResponse) => {
    const body = await req.json();

    const { name, email, message } = body;

    try {
        // データベースに問い合わせデータを保存
        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                message,
            },
        });
        // レスポンスを返す
        return NextResponse.json({
            status: "OK",
            message: "送信しました！",
            id: contact.id,
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ status: error.message });
        }
    }
};
