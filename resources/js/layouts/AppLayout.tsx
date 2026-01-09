import { ReactNode } from 'react';
import AppSidebar from '@/components/app-sidebar-new';
import AppSidebarHeader from '@/components/app-sidebar-header-new';
import { NavbarItem } from '@/types';

interface AppLayoutProps {
    children: ReactNode;
    title: string;
    currentView?: 'list' | 'create';
    onViewChange?: (view: 'list' | 'create') => void;
}

export default function AppLayout({ children, title, currentView = 'list', onViewChange }: AppLayoutProps) {
    const sidebarItems = [
        {
            id: 'patients-list',
            title: 'Patients list',
            href: '/patients',
            isActive: currentView === 'list',
            onClick: onViewChange ? () => onViewChange('list') : undefined
        },
        {
            id: 'patients-create',
            title: 'Add Patient',
            href: '/patients/create',
            isActive: currentView === 'create',
            onClick: onViewChange ? () => onViewChange('create') : undefined
        }
    ];
    return (
        <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <AppSidebar title={title} navElements={sidebarItems} />

            <main className="bg-gray-100 flex-1 overflow-y-auto p-6 ">
                {children}
            </main>
        </div>
    );
}
