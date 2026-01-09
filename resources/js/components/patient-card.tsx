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
                    className="transition-transform duration-300"
                    aria-expanded={open}
                >
                    <svg
                        className={`h-5 w-5 transform transition-transform duration-300 ${
                            open ? 'rotate-180' : ''
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                            clipRule="evenodd"
                        />
                    </svg>
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
