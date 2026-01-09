
import { NavbarItem } from "@/types";

interface AppSidebarNavProps {
    elements: NavbarItem[];
}

export default function AppSidebarNav({elements}: AppSidebarNavProps) {
    return (
        <nav className="flex flex-col gap-2">
            {elements.map((b, i) => (
                <span key={`sidebar__nav-item-${i}`}>
                    {b.href ? (
                        <a href={b.href} className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                            {b.title}
                        </a>
                    ) : (
                        <span>{b.title}</span>
                    )}
                </span>
            ))}
        </nav>
    )
}
