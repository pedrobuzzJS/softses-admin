import "./style.scss";
import {STabNavigationProps, useSMenu} from "@/context/menuNavigationContext";

interface STabMenuItem extends STabNavigationProps {};

export function TabMenuItem({ itemIndex, label, path }: STabMenuItem) {
    const { selectTab, closeTab } = useSMenu();

    return (
        <>
            <div className="p-menuitem-link">
                <div className="p-menuitem-internal" onClick={() => selectTab(itemIndex, path)}>
                    <span>{label}</span>
                    <span className="p-menuitem-delete" onClick={() => closeTab(itemIndex)}>X</span>
                </div>
            </div>
        </>
    );
}