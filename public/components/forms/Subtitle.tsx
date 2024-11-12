import React from "react";
import {className} from "postcss-selector-parser";

const Subtitle: React.FC<{
    text: string;
    color?: string;
    className?: string;
    required?: boolean;
}> = ({ text, color = "soft-gray", required = false }) => {
    return (
        <p className={"flex justify-start items-center gap-1 mb-1 font-medium text-" + className}>
            {required && <i className="bi bi-asterisk text-primary text-xs"></i>}{" "}
            {text}
        </p>
    );
};

export default Subtitle;