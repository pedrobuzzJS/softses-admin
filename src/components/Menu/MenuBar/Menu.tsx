"use client"

import React, {useState} from 'react';
import {Keys, Menu, MenuBar, Separator} from 'react-app-menu';
import 'react-app-menu/dist/styles/react-app-menu.css'
import {useSMenu} from "@/context/menuContext";
import styles from "./_menuBar.module.scss";
import TabMenusNavigation from "@/components/TabMenusNavigation/TabMenusNavigation";

export default function SMenuBar() {
    let [showToolbar, setShowToolbar] = useState(true);
    let [showTooltip, setShowTooltip] = useState(false);
    const {superOpenSideBar, isSideBarOpen} = useSMenu();

    const handleMenuSelect = (menuId: string): void => {
        console.log(menuId)
        switch (menuId) {
            case 'toolbar':
                return setShowToolbar(!showToolbar);
            case 'toolTips':
                return setShowTooltip(!showTooltip);
            default:
                console.log(`menu selected ${menuId}`)
        }
    };

    const onFolderSelect = (): void => {
        console.log('Folder selected');
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
                        <Menu label='New'>
                            <Menu menuId='NewNotebook' label='Notebook'/>
                            <Menu menuId="NewNote" label='Note' hotKeys={Keys.ctrlAlt('N')}/>
                            <Separator/>
                            <Menu label="Folder" hotKeys={Keys.ctrlAlt("F")} onSelect={onFolderSelect}/>
                            <Menu label='New'>
                                <Menu menuId='NewNotebook' label='Notebook'/>
                                <Menu menuId="NewNote" label='Note' hotKeys={Keys.ctrlAlt('N')}/>
                                <Separator/>
                                <Menu label="Folder" hotKeys={Keys.ctrlAlt("F")} onSelect={onFolderSelect}/>
                            </Menu>
                        </Menu>
                        <Menu label='Settings' hotKeys={Keys.altShift("S")}/>
                    </Menu>
                    <Menu label='Edit' focusKey='E'>
                        <Menu menuId='search' label='Search' hotKeys={Keys.ctrlShift('F')}/>
                        <Menu menuId='undo' label='Undo' hotKeys={Keys.ctrl('Z')}/>
                        <Menu menuId='rename' label='Rename' hotKeys={Keys.shift('F6')}/>
                    </Menu>
                    <Menu label='View' focusKey='V'>
                        <Menu menuId='toolbar' label='Toolbars' checked={showToolbar} hotKeys={Keys.ctrlAlt("T")}/>
                        <Menu menuId='statusBar' label='StatusBar'/>
                        <Menu menuId='toolTips' label='Tooltips' checked={showTooltip}
                              hotKeys={Keys.ctrlAltShift("T")}/>
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