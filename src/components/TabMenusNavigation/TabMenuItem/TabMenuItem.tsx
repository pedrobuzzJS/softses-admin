import "./style.scss";
import {STabNavigationProps, useSMenu} from "@/context/menuNavigationContext";
import {useRef, useCallback} from "react";

interface STabMenuItem extends STabNavigationProps {};

export function TabMenuItem({ itemIndex, label, path }: STabMenuItem) {
    const { selectTab, closeTab } = useSMenu();
    const ref = useRef(null)

    const newTab = useCallback(() => {
        selectTab(itemIndex, path)
    }, [])

    return (
        <>
            <div className="p-menuitem-link">
                <div className="p-menuitem-internal" onClick={() => selectTab(itemIndex, path)} ref={ref}>
                    <span>{label}</span>
                    <span className="p-menuitem-delete" onClick={() => closeTab(itemIndex)}>X</span>
                </div>
            </div>
        </>
    );
}