import type React from "react";
import { cn } from "../utils/cn";

export const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("max-w-4xl mx-auto px-4 md:px-1 ", className)}>{children}</div>;
};
