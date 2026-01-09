import { useState } from 'react';
import { Patient } from "@/types";


export default function PatientCard({
        first_name,
        last_name,
        email,
        phone,
        document_image,
        created_at,
    }: Patient) {

    const [open, setOpen] = useState(false);
    return (
        <div
            className="c-patient-card overflow-hidden rounded-xl border bg-white transition-shadow duration-300 hover:shadow-md"
        >
            <div className="flex items-center gap-4 p-4">

                <img
                    src={document_image}
                    alt="Document"
                    className="h-20 w-20 rounded-lg object-cover"
                />


                <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                        {first_name} {last_name}
                    </h3>
                </div>


                <button
                    onClick={() => setOpen((v) => !v)}
                    className="btn btn-round btn-primary transition-transform duration-300"
                    aria-expanded={open}
                >
                    {
                        open ?
                        "Close"
                        :
                        "View All"
                    }
                </button>
            </div>

            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="border-t p-4 text-sm text-gray-600 space-y-2">
                        <p>
                            <span className="font-medium">Email:</span> {email}
                        </p>
                        <p>
                            <span className="font-medium">Phone:</span> {phone}
                        </p>
                        <p>
                            <span className="font-medium">Created:</span>{' '}
                            {new Date(created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
