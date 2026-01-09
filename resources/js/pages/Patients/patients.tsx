import { Patient } from "@/types";
import PatientCard from "@/components/patient-card";

interface PatientsGridProps {
    patients: Patient[]
}

export default function PatientsGrid({patients}: PatientsGridProps) {

    return(
        <div className="grid gap-4">
            {patients.map((patient) => (
                <PatientCard key={`patient__card-${patient.id}`} {...patient}/>
            ))}
        </div>
    )
}
