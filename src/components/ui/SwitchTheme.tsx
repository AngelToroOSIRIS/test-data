"use client"
import Icon from "@/components/ui/Icon";
import {useSwitch, VisuallyHidden} from "@nextui-org/react";
import {useTheme} from "next-themes"
import {cn} from "@/libs/utils";
import useMounted from "@/hooks/UseMounted";

export const SwitchTheme = () => {
    const mounted = useMounted();
    const {theme, setTheme} = useTheme();
    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps
    } = useSwitch({
        isSelected: theme === "dark",
        onValueChange: (value) => setTheme(value ? "dark" : "light")
    });
    if (!mounted) return null;
    return (
        <Component {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: [
                        "w-8 h-8",
                        "fixed bottom-3 right-3 items-center justify-center",
                        cn("rounded-lg bg-opacity-90 bg-divider soft-shadow mr-0 z-40"),
                    ],
                })}
            >
                {isSelected ? <Icon icon="brightness-high-fill" className="text-xl text-default-white"/> :
                    <Icon icon="moon-fill" className="text-lg text-primary"/>}
            </div>
        </Component>
    )
        ;
};
