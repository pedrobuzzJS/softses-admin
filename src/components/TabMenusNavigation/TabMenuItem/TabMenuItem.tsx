import "./style.scss";
import {STabNavigationProps, useSMenu} from "@/context/menuNavigationContext";
import {useRef, useCallback} from "react";
import {TabMenuTabChangeEvent} from "primereact/tabmenu";

interface STabMenuItem extends STabNavigationProps {
    ee: TabMenuTabChangeEvent;
};

export function TabMenuItem({ itemIndex, label, path, ee }: STabMenuItem) {
    const { selectTab, closeTab } = useSMenu();
    const ref = useRef(null)

    return (
        <>
            <div className="p-menuitem-link">
                <div className="p-menuitem-internal" onClick={(e) => selectTab(itemIndex, path)} ref={ref}>
                    <span>{label}</span>
                </div>
                <span className="p-menuitem-delete" onClick={() => closeTab(itemIndex)}>
                    <div >x</div>
                </span>
            </div>
        </>
    );
}