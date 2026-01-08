
export default function SuccessMessage({ onClose }: { onClose: () => void }) {
    return (
        <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold text-green-600">
                Patient created
            </h2>
            <p className="mb-4 text-sm text-gray-600">
                The patient was registered successfully.
            </p>
            <button
                onClick={onClose}
                className="rounded bg-green-600 px-4 py-2 text-white"
            >
                Continue
            </button>
        </div>
    );
}
