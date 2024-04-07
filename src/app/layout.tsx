import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./_components/SideBar/Sidebar";
import Footer from "./_components/Footer/Footer";
import Favicon from "/public/images/common/favicon.ico";
// 全体のスタイルを適用
import "./styles/style.scss";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "キブンメシ-気分で決めるレシピサイト",
    description: "キブンを軸にレシピを決めるサイトです。",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>
                <Sidebar />
                <div className="main-content">
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
