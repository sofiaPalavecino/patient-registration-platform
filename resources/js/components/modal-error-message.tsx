
export default function ErrorMessage({ onClose }: { onClose: () => void }) {
    return (
        <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold text-red-600">
                Something went wrong
            </h2>
            <p className="mb-4 text-sm text-gray-600">
                Please check the form and try again.
            </p>
            <button
                onClick={onClose}
                className="rounded bg-red-600 px-4 py-2 text-white"
            >
                Close
            </button>
        </div>
    );
}
