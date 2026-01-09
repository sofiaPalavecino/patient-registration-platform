import { NavbarItem } from "@/types";

interface AppSidebarNavProps {
    elements: NavbarItem[];
    onNavigate?: () => void;
}

export default function AppSidebarNav({ elements, onNavigate }: AppSidebarNavProps) {
    return (
        <nav className="flex gap-4 md:gap-1 flex-col">
            {elements.map((item) => {
                const isActive = item.isActive ?? (item.href === window.location.pathname);

                const handleClick = (e: React.MouseEvent) => {
                    if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                        if (onNavigate) onNavigate();
                    }
                };

                return (
                    <a
                        key={item.id || item.title}
                        href={item.href}
                        onClick={handleClick}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors cursor-pointer ${
                            isActive
                                ? "btn btn-primary text-sidebar-primary-foreground"
                                : "btn btn-secondary hover:bg-sidebar-accent"
                        }`}
                    >
                        {item.title}

                        {isActive && (
                            <svg
                                className="ml-auto h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        )}
                    </a>
                );
            })}
        </nav>
    );
}
