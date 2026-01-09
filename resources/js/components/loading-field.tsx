
interface LoadingFieldProps {
    text: string;
}

export default function LoadingField({text}: LoadingFieldProps) {
    return (
        <p className="animate-pulse text-sm text-gray-500">
            {text}
        </p>
    )
}
