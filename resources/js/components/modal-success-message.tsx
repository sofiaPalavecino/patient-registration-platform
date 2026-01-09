
interface SuccessMessageProps {
    onClose: () => void;
    onBackToList?: () => void;
}

export default function SuccessMessage({ onClose, onBackToList }: SuccessMessageProps) {
    return (
        <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold text-green-600">
                Patient created
            </h2>
            <p className="mb-4 text-sm text-gray-600">
                The patient was registered successfully.
            </p>
            <div className="flex gap-3 justify-center">
                <button
                    onClick={onClose}
                    className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                    Add another
                </button>
                {onBackToList && (
                    <button
                        onClick={onBackToList}
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                        Back to patients
                    </button>
                )}
            </div>
        </div>
    );
}
