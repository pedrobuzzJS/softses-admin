import React from "react";
import { Dialog, DialogProps } from "primereact/dialog";
import Grid, {Cols} from "@/components/GridSystem/Grid/Grid";
import "./_modal.scss";
// import style from "./_modal.module.scss";
interface IModalProps extends DialogProps {
    col?: Cols;
}

export const Modal: React.FC<IModalProps> = ({
    children,
    header,
    footer,
    visible,
    onHide,
    draggable = false,
    resizable = false,
    ...props
}) => {
    return (
        <Dialog
            header={header}
            visible={visible}
            footer={footer}
            onHide={onHide}
            draggable={draggable}
            resizable={resizable}
            {/*{...props}*/}
        >
            <Grid padding={5}>{children}</Grid>
        </Dialog>
    );
};