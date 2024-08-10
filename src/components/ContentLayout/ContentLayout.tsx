"use client"

import {PropsWithChildren, useEffect, useState} from "react";
import styles from "./_contantPage.module.scss";
import SMenuBar from "@/components/Menu/MenuBar/Menu";
import {useSMenu} from "@/context/menuNavigationContext";
import React from "react";
import Link from "next/link";

export default function ContentLayout({ children }: PropsWithChildren) {
    const { superOpenSideBar, redirectPage } = useSMenu();
    const [ currentPage, setCurrentPage ] = useState<React.ReactNode | null>(null);

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