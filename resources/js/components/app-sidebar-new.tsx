import { ReactNode, useState } from "react";
import AppSidebarNav from "./app-sidebar-nav";
import { NavbarItem } from "@/types";

interface AppSidebarProps {
    children?: ReactNode;
    title: string
    navElements?: NavbarItem[];
}

export default function AppSidebar({ children, title, navElements }: AppSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside
            className="
                c-sidebar w-full h-16
                md:w-64 md:h-auto
                flex-shrink-0
            "
        >
            <div
                className="
                    h-full
                    flex items-center justify-between
                    md:flex-col md:items-stretch md:justify-start
                    p-4 gap-4
                "
            >
                <div className="flex w-full items-center justify-between md:hidden">
                    <div className="title-container">
                        <h1>{title}</h1>
                    </div>

                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        className="btn btn-secondary rounded-lg p-2"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="white"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                <div className="hidden md:block">
                    <div className="title-container mb-5">
                        <h1>{title}</h1>
                    </div>
                    <AppSidebarNav elements={navElements || []} />
                </div>

                {isOpen && (
                    <div className="c-sidebar--open absolute top-16 left-0 h-full md:hidden">
                        <div className="p-4">
                            <AppSidebarNav
                                elements={navElements || []}
                                onNavigate={() => setIsOpen(false)}
                            />
                        </div>
                    </div>
                )}

                {children}
            </div>
        </aside>
    );
}
