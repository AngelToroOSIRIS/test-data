"use client"

import {ToastContainer} from "react-toastify";
import {useTheme} from "next-themes";
import {cn} from "@/libs/utils";
import useMounted from "@/hooks/UseMounted";

export const Toaster = () => {
    const {theme} = useTheme();
    const mounted = useMounted();

    if (!mounted) return null;

    return (
        <ToastContainer
            containerId="react-toastify"
            position="bottom-center"
            pauseOnHover={false}
            autoClose={2000}
            role="alert"
            draggablePercent={60}
            draggable
            stacked
            limit={5}
            theme={theme}
            toastClassName={cn({
                "bg-[#fff]": theme === "light",
                "bg-[#3b3b3b]": theme === "dark"
            })}
            style={{
                userSelect: "none",
            }}
        />
    );
};