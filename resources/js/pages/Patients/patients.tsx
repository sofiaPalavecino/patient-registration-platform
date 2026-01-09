import { Patient } from "@/types";
import AppLayout from "@/layouts/AppLayout";
import PatientCard from "@/components/patient-card";

interface PatientsCardsProps {
    patients: Patient[]
}

export default function PatientsCards({patients}:PatientsCardsProps) {

    return(
        <div className="grid gap-4">
            {patients.map((patient) => (
                <PatientCard key={`patient__card-${patient.id}`} {...patient}/>
            ))}
        </div>
    )
}
