import { ReactNode } from 'react';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppSidebarHeader({ breadcrumbs }: AppSidebarHeaderProps) {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
        <div className="mb-4">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
                {breadcrumbs.map((b, i) => (
                    <span key={i}>
                        {b.href ? (
                            <Link href={b.href} className="hover:underline">
                                {b.title}
                            </Link>
                        ) : (
                            <span>{b.title}</span>
                        )}
                        {i < breadcrumbs.length - 1 && ' / '}
                    </span>
                ))}
            </nav>
        </div>
    );
}
