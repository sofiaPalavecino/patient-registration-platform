
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Patient } from '@/types';
import LoadingField from '@/components/loading-field';
import PatientsCards from './patients';

const sidebarItems = [
    {
        title: 'Create Patient',
        href: '/patients/create'
    }
];

export default function Patients() {

    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Add delay to test loading handling
        //setTimeout(() => {
            fetch('/api/patients')
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to load patients');
                    }
                    return res.json();
                })
                .then((json) => {
                    setPatients(json.data);
                })
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        //}, 2000); // 2 second delay
    }, []);

    return (
        <AppLayout breadcrumbs={sidebarItems}>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold mb-4">Patients</h1>

            {loading && (
                <LoadingField text="Loading patients..." />
            )}

            {!loading && error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {!loading && !error && patients.length === 0 && (
                <div className="rounded border border-dashed p-8 text-center">
                    <p className="mb-4 text-gray-600">
                        No patients registered yet.
                    </p>

                    <Link
                        href="/patients/create"
                        className="inline-flex rounded bg-black px-4 py-2 text-sm text-white"
                    >
                        Create patient
                    </Link>
                </div>
            )}

            {!loading && !error && patients.length > 0 && (
                <div>

                    <PatientsCards patients={patients} />
                </div>
            )}
        </AppLayout>
    )
}
