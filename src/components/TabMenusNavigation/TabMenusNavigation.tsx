"use client"

import {TabMenu} from "primereact/tabmenu";
import { MenuItem } from 'primereact/menuitem';
import {useState, useRef} from "react";
import {TabMenuItem} from "@/components/TabMenusNavigation/TabMenuItem/TabMenuItem";
import "./style.scss";
import {useSMenu} from "@/context/menuNavigationContext";
import {STabNavigationProps} from "@/context/menuNavigationContext";

export default function TabMenusNavigation() {
    const { activeIndex, selectTab, activeMenus  } = useSMenu();

    return (
        <TabMenu model={activeMenus} activeIndex={activeIndex} onTabChange={(e) => selectTab(activeIndex)} />
    )
}