"use client";

import {NextUIProvider} from "@nextui-org/react";

import {ThemeProvider as NextThemesProvider} from "next-themes"

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light" themes={["light", "dark"]}>
                <div className="flex flex-col min-h-[100vh] bg-default-white dark:bg-custom-black text-foreground">
                    {children}
                </div>
            </NextThemesProvider>
        </NextUIProvider>
    );
}