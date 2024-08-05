"use client"

import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import {delayAndRun} from "@/helpers/functions";
interface SMenuProps {
    superOpenSideBar: boolean;
    isSideBarOpen: boolean;
    toggleSideBar: () => any;
    handleSideBar: (open: boolean) => any;
}

interface SMenuWithChildren extends PropsWithChildren {}

export const MenuContext = createContext<SMenuProps>({} as SMenuProps);

export const SMenuProvider: React.FC<SMenuWithChildren> = ({ children }) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const [superOpenSideBar, setSuperOpenSideBar] = useState<boolean>(false);

    const toggleSideBar = () => {
        delayAndRun(() => {
            setSuperOpenSideBar(!superOpenSideBar);
            setIsSideBarOpen(!superOpenSideBar);
        }, 200);
    };

    const handleSideBar = (open: boolean) => {
        if (superOpenSideBar) {
            return;
        }
        delayAndRun(() => {
            setIsSideBarOpen(open);
        }, 200);
    };

    return (
        <MenuContext.Provider value={{
            isSideBarOpen: isSideBarOpen,
            superOpenSideBar: superOpenSideBar,
            toggleSideBar: toggleSideBar,
            handleSideBar: handleSideBar,
        }}>
            {children}
        </MenuContext.Provider>
    )
}

export function useSMenu() {
    return useContext(MenuContext);
}