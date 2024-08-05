"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type SesActiveLinkProps = LinkProps & {
    children: React.ReactElement;
};

export default function SActiveLink({ href, children, ...props }: SesActiveLinkProps) {
    const pathName = usePathname();
    const isActive = pathName === href.toString();

    return (
        <div>
            <Link
                href={href}
                {/*{...props}*/}
                className={isActive ? "" : ""}
                style={{ color: "yellow" }}
            >
                {children}
            </Link>
        </div>
    );
}