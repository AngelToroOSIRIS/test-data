"use client";

import {cn} from "@/libs/utils";

const Icon = ({
                  icon,
                  onClick,
                  title,
                  className = "",
              }: {
    icon: string;
    title?: string;
    onClick?: () => void;
    className?: string;
}) => {
    return (
        <i onClick={onClick} title={title} className={cn(`bi bi-${icon}`, className)}></i>
    );
};

export default Icon;
