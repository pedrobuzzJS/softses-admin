"use client"

import {Dialog, DialogProps} from "primereact/dialog";
import "./_modal.scss"
import {useState} from "react";
import Grid from "@/components/GridSystem/Grid/Grid";

interface SModalProps extends DialogProps {
    registerId?: string | number;
    onHide?: () => void;
    headerLabel?: string;
}

export default function Modal({
    children,
    header,
    footer,
    draggable = false,
    resizable = false,
    headerLabel,
    ...props
}: SModalProps) {
    const [ isVisible, setIsVisible ] = useState<boolean>(true);

    const HEADER = (
        <Grid height={50}>
            <span style={{
                paddingLeft: "10px"
            }}>{headerLabel || '{label}'}</span>
        </Grid>
    );

    const FOOTER = (
        <Grid height={50} justify="end">
        </Grid>
    );

    return (
        <Dialog
            visible={isVisible}
            header={HEADER}
            footer={FOOTER}
            esizable={false}
            onHide={() => setIsVisible(false)}
            draggable={draggable}
            resizable={resizable}
            {...props}
        >
            {children}
        </Dialog>
    )
}