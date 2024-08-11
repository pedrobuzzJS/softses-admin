"use client"

import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import {delayAndRun} from "@/helpers/functions";
import { MenuItem } from "primereact/menuitem";
import {TabMenuItem} from "@/components/TabMenusNavigation/TabMenuItem/TabMenuItem";
import {useRouter} from "next/navigation";
import {NavigateOptions} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {produce} from "immer";

interface SMenuProps {
    superOpenSideBar: boolean;
    isSideBarOpen: boolean;
    toggleSideBar: () => any;
    handleSideBar: (open: boolean) => any;
    activeIndex: number;
    selectTab: (index: number, path?: string) => void;
    activeMenus: STabNavigationProps[];
    closeTab: (activeIndex: number) => void;
    goesTo: (path: string, options?: NavigateOptions)=> void;
}

export interface STabNavigationProps extends MenuItem {
    itemIndex: number;
    active: boolean;
    path?: string;
}

interface SMenuWithChildren extends PropsWithChildren {}

export const MenuNavigationContext = createContext<SMenuProps>({} as SMenuProps);

export const SMenuProvider: React.FC<SMenuWithChildren> = ({ children }) => {
    const itemRenderer = (item, itemIndex) => {
        return (
            <TabMenuItem itemIndex={itemIndex} label={item.label} path={item.path}/>
        );
    };

    const collect = require("collect.js");
    const router = useRouter();
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const [superOpenSideBar, setSuperOpenSideBar] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [ activeMenus, setActiveMenus ] = useState<STabNavigationProps[]>(
        [
            // {
            //     label: 'Home',
            //     path: '/',
            //     itemIndex: 0,
            //     active: true,
            //     template: (item) => itemRenderer(item, 0)
            // },
            // {
            //     label: 'Dash',
            //     path: 'dash',
            //     itemIndex: 1,
            //     active: false,
            //     template: (item) => itemRenderer(item, 1)
            // },
        ]
    );

    const closeTab = async (activeIndex: number) => {
        setActiveMenus(activeMenus.filter((item) => item.itemIndex != activeIndex));
    }

    const selectTab = (tab: number, path?: string) => {
        activeMenus.forEach(item => {
            if (tab == item.itemIndex)
                return item.active = true
            return item.active = false
        });
        setActiveIndex(collect<STabNavigationProps[]>(activeMenus).pluck('itemIndex').toArray().indexOf(tab));
        if (path) goesTo(path);
    }

    const addTab = (newTab: STabNavigationProps) => [
        setActiveMenus([
            ...activeMenus,
            newTab
        ])
    ]

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

    const goesTo = (path: string, options?: NavigateOptions) => {
        addTab({
            label: path,
            path: path,
            itemIndex: 0,
            active: true,
            template: (item) => itemRenderer(item, 0)
        })
        return router.push(path)
    }

    return (
        <MenuNavigationContext.Provider value={{
            isSideBarOpen: isSideBarOpen,
            superOpenSideBar: superOpenSideBar,
            toggleSideBar: toggleSideBar,
            handleSideBar: handleSideBar,
            activeIndex: activeIndex,
            selectTab: selectTab,
            activeMenus: activeMenus,
            closeTab: closeTab,
            goesTo: goesTo
        }}>
            {children}
        </MenuNavigationContext.Provider>
    )
}

export function useSMenu() {
    return useContext(MenuNavigationContext);
}