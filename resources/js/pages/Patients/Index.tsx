
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Patient } from '@/types';
import LoadingField from '@/components/loading-field';
import PatientsGrid from './patients';

interface PatientsIndexProps {
    onCreatePatient: () => void;
    refreshTrigger?: number;
}

export default function PatientsIndex({ onCreatePatient, refreshTrigger = 0 }: PatientsIndexProps) {

    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

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
    }, [refreshTrigger]);

    return (
        <>
            <Head title="Patients" />

            {loading && (
                <LoadingField text="Loading patients..." />
            )}

            {!loading && error && (
                <p className="text-red-600">{error}</p>
            )}

            {!loading && !error && patients.length === 0 && (
                <div className="rounded border border-dashed p-8 text-center">
                    <p className="mb-4 text-gray-600">
                        No patients registered yet.
                    </p>

                    <button
                        onClick={onCreatePatient}
                        className="btn btn-primary btn-round inline-flex rounded bg-black px-4 py-2 text-white"
                    >
                        Add a patient
                    </button>
                </div>
            )}

            {!loading && !error && patients.length > 0 && (
                <PatientsGrid patients={patients} />
            )}
        </>
    )
}
