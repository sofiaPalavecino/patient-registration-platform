import { ReactNode } from 'react';
import AppSidebar from '@/components/app-sidebar-new';
import AppSidebarHeader from '@/components/app-sidebar-header-new';
import { NavbarItem } from '@/types';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: any[];
}

const navbarElements: NavbarItem[] = [
    {
        title: "Add Patient",
        href: "/patients/create"
    }
]

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <AppSidebar navElements={navbarElements} />

            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>
        </div>
    );
}
