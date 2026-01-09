import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import PatientsIndex from './Index';
import PatientsCreate from './Create';

type View = 'list' | 'create';

export default function PatientsUnified() {
    const [currentView, setCurrentView] = useState<View>('list');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    const handlePatientCreated = () => {
        setCurrentView('list');
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <AppLayout
            title={currentView === 'list' ? 'Patients' : 'Add Patient'}
            currentView={currentView}
            onViewChange={handleViewChange}
        >
            {currentView === 'list' && (
                <PatientsIndex
                    onCreatePatient={() => handleViewChange('create')}
                    refreshTrigger={refreshTrigger}
                />
            )}

            {currentView === 'create' && (
                <PatientsCreate
                    onCancel={() => handleViewChange('list')}
                    onSuccess={handlePatientCreated}
                />
            )}
        </AppLayout>
    );
}
