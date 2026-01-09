import { ReactNode } from 'react';
import AppSidebarNav from './app-sidebar-nav';
import { NavbarItem } from '@/types';

interface AppSidebarProps {
    children?: ReactNode;
    navElements?: NavbarItem[]
}

export default function AppSidebar({ children, navElements }: AppSidebarProps) {
    return (
        <aside className="w-64 flex-shrink-0 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
            <div className="h-full flex flex-col p-4 gap-4">
                <AppSidebarNav elements={navElements || []}/>
                {children}
            </div>
        </aside>
    );
}
