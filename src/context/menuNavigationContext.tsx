"use client"

import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import {delayAndRun} from "@/helpers/functions";
import { MenuItem } from "primereact/menuitem";
import {TabMenuItem} from "@/components/TabMenusNavigation/TabMenuItem/TabMenuItem";
import {useRouter} from "next/navigation";
import {NavigateOptions} from "next/dist/shared/lib/app-router-context.shared-runtime";
import collect from "collect.js";

interface SMenuProps {
    superOpenSideBar: boolean;
    isSideBarOpen: boolean;
    toggleSideBar: () => any;
    handleSideBar: (open: boolean) => any;
    activeIndex: number;
    selectTab: (tab: number, path?: string) => void;
    activeMenus: STabNavigationProps[];
    currentTab: STabNavigationProps;
    closeTab: (activeIndex: number) => void;
    goesTo: (path: string, options?: NavigateOptions)=> void;
    addNewTab: (path: string, label: string) => void;
}

export interface STabNavigationProps extends MenuItem {
    label: string;
    itemIndex: number;
    active: boolean;
    path?: string;
}

interface SMenuWithChildren extends PropsWithChildren {}

export const MenuNavigationContext = createContext<SMenuProps>({} as SMenuProps);

export const SMenuProvider: React.FC<SMenuWithChildren> = ({ children }) => {
    const itemRenderer = (item: STabNavigationProps) => {
        return (
            <TabMenuItem itemIndex={item.itemIndex} label={item.label} path={item.path}/>
        );
    };

    const collect = require("collect.js");
    const router = useRouter();
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const [superOpenSideBar, setSuperOpenSideBar] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [ currentTab, setCurrentTab ] = useState<STabNavigationProps>({} as STabNavigationProps);
    const [ activeMenus, setActiveMenus ] = useState<STabNavigationProps[]>(
        [
            // {
            //     label: 'Home',
            //     path: '/',
            //     itemIndex: 0,
            //     active: false,
            //     template: (item) => itemRenderer(item as STabNavigationProps)
            // },
            // {
            //     label: 'Dash',
            //     path: 'dash',
            //     itemIndex: 1,
            //     active: true,
            //     template: (item) => itemRenderer(item as STabNavigationProps)
            // },
            // {
            //     label: 'Pessoas',
            //     path: 'pessoas',
            //     itemIndex: 2,
            //     active: false,
            //     template: (item) => itemRenderer(item as STabNavigationProps)
            // },
            // {
            //     label: 'Contatos',
            //     path: 'contatos',
            //     itemIndex: 3,
            //     active: false,
            //     template: (item) => itemRenderer(item)
            // },
        ]
    );

    const closeTab = async (activeIndex: number) => {
        const relativeTab = collect(activeMenus).first();
        selectTab(relativeTab?.itemIndex, relativeTab?.path);
        setActiveMenus(activeMenus.filter((item) => item.itemIndex != activeIndex));
    }

    const selectTab = (tab: number, path?: string) => {
        activeMenus.forEach(item => {
            if (tab == item.itemIndex)
                return item.active = true
            return item.active = false
        });
        setActiveMenus(activeMenus)
        setActiveIndex(collect<STabNavigationProps[]>(activeMenus).pluck('itemIndex').toArray().indexOf(tab));
        if (path) goesTo(path);
    }

    const addNewTab = (path: string, label: string) => {
        if (collect(activeMenus).pluck('path').toArray().includes(path))
            return

        const newTab: STabNavigationProps = {
            active: false,
            itemIndex: activeMenus.length != 0 ? collect(activeMenus).max('itemIndex') + 1 : 0,
            label: label,
            path: path,
            template: (item) => itemRenderer(item, 1)
        }
        setActiveMenus([
            ...activeMenus,
            newTab
        ])
    }

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
            goesTo: goesTo,
            addNewTab: addNewTab,
            currentTab: currentTab,
        }}>
            {children}
        </MenuNavigationContext.Provider>
    )
}

export function useSMenu() {
    return useContext(MenuNavigationContext);
}