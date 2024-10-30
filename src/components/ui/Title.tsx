"use client"

import {cn} from "@/libs/utils";

interface Props {
    text: string,
    onClick?: () => void,
    center?: boolean,
    background?: boolean,
    size?: "title" | "medium" | "subtitle";
    className?: string;
}

const Title = ({text, size = "title", center = true, background = false, className, onClick}: Props) => {
    return (
        <p onClick={onClick} className={cn(`text-primary font-semibold `, className, {
            "text-2xl": size == "title",
            "text-xl": size == "medium",
            "text-lg": size == "subtitle",
            "cursor-pointer transition-all text-default-400 select-none": onClick,
            "transition-all text-default-400 select-none": background,
            "text-center": center
        })}>
            {text}
        </p>
    );
};

export default Title;