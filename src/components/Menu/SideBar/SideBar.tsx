"use client"

import styles from "./_sideBar.module.scss";
import {useSMenu} from "@/context/menuNavigationContext";

export default function SideBar() {
    const { isSideBarOpen, toggleSideBar, handleSideBar } = useSMenu();

    return (
        <>
            <aside
                className={`${styles.sideBar} ${
                    isSideBarOpen ? styles.open : styles.sideBar
                }`}
            >
                <div
                    className={`${styles.sideBarHeader} ${
                        isSideBarOpen ? styles.open : styles.sideBarHeader
                    }`}
                    onClick={toggleSideBar}
                >
                    {/*<i className="pi pi-bars" style={{ fontSize: "2rem" }}></i>*/}
                </div>
                <div
                    className={`${styles.list} ${
                        isSideBarOpen ? styles.listOpen : ""
                    }`}
                    onMouseOver={() => handleSideBar(true)}
                    onMouseLeave={() => handleSideBar(false)}
                ></div>
                <div
                    style={{
                        position: "absolute",
                        zIndex: 100,
                        left: 0,
                        top: "50px"
                    }}
                >
                </div>
            </aside>
        </>
    );
}