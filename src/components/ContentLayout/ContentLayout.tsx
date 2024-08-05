"use client"

import {PropsWithChildren} from "react";
import styles from "./_contantPage.module.scss";
import SMenuBar from "@/components/Menu/MenuBar/Menu";
import {useSMenu} from "@/context/menuContext";

export default function ContentLayout({ children }: PropsWithChildren) {
    const { superOpenSideBar } = useSMenu();

    return (
        <>
            <SMenuBar />
            <div
                className={`${styles.content} ${
                    superOpenSideBar ? styles.open : styles.content
                }`}
                style={{
                    position: "relative",
                    padding: "5px",
                }}
            >
                {children}
            </div>
        </>
    );
}