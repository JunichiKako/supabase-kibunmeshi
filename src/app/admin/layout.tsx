"use client";

import { usePathname } from "next/navigation";
import { useRouteGuard } from "./_hooks/useRouteGuard";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useRouteGuard();

    const pathname = usePathname();
    const isSelected = (href: string) => {
        return pathname.includes(href);
    };

    return <>{children}</>;
}
