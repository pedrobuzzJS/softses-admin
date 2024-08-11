"use client"

import {PropsWithChildren, useCallback} from "react";
import style from "./_lineFluid.module.scss";
import {Cols} from "@/components/GridSystem/Grid/Grid";

interface SLineFluidProps extends PropsWithChildren {
    col?: Cols;
    gap?: number;
}

export default function LineFluid({children, col = 12, ...props}: SLineFluidProps) {
    const getCol = useCallback(() => {
        return `col-${col}`;
    }, [col]);

    return (
        <div className={style[getCol()]} {...props}>
            {children}
        </div>
    );
}