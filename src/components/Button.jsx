import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md active:shadow ripple ${bgColor} ${textColor} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}
