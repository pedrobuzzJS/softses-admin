"use client"

import React, {useState} from 'react';
import {Keys, Menu, MenuBar} from 'react-app-menu';
import 'react-app-menu/dist/styles/react-app-menu.css'
import {useSMenu} from "@/context/menuNavigationContext";
import styles from "./_menuBar.module.scss";
import TabMenusNavigation from "@/components/TabMenusNavigation/TabMenusNavigation";

export default function SMenuBar() {
    const [showToolbar, setShowToolbar] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);
    const {superOpenSideBar, isSideBarOpen} = useSMenu();
    const { addNewTab } = useSMenu();

    const handleMenuSelect = (menuId: string): void => {
        switch (menuId) {
            case 'toolbar':
                return setShowToolbar(!showToolbar);
            case 'toolTips':
                return setShowTooltip(!showTooltip);
            default:
                console.log(`menu selected ${menuId}`)
        }
    };

    return (
        <>
            <div
                className={`${styles.content} ${
                    superOpenSideBar || isSideBarOpen ? styles.open : styles.content
                }`}
            >
                <MenuBar onSelect={handleMenuSelect} openMenusOnHover>
                    <Menu label='File' focusKey={"F"}>
                        <Menu label='Raiz' hotKeys={Keys.altShift("S")} onSelect={() => addNewTab('/', 'Home')}/>
                        <Menu label='Dash' hotKeys={Keys.altShift("S")} onSelect={() => addNewTab('dash', 'Dash')}/>
                        <Menu label='Contatos' hotKeys={Keys.altShift("S")} onSelect={() => addNewTab('contatos', 'Contatos')}/>
                        <Menu label='Pessoas' hotKeys={Keys.altShift("S")} onSelect={() => addNewTab('pessoas', 'Pessoas')}/>
                    </Menu>
                </MenuBar>
            </div>
            <div
                className={`${styles.content} ${
                    superOpenSideBar ? styles.open : styles.tabMenuBar
                }`}
            >
                <TabMenusNavigation />
            </div>
        </>
    );
}