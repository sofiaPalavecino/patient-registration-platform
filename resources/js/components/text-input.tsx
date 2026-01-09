
import ErrorField from "./error-field"

interface TextInputProps {
    label: string;
    name: string;
    value: string;
    type?: string;
    error?: string;
    required?: boolean;
    onChange: (value: string) => void;
    onFocus?: () => void;
    placeholder?: string;
}

export default function TextInput({
        label,
        name,
        value,
        type = "text",
        error,
        required = true,
        onChange,
        onFocus,
        placeholder,
    }: TextInputProps) {

    return (
        <>
            <label htmlFor={name} className="mb-1 block text-sm font-medium">
                {label}
            </label>
            <input
                id={`create__patients-${name}`}
                type={type}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                required={required}
                placeholder={placeholder}
                className={`w-full rounded border px-3 py-2 focus:ring-1 focus:ring-blue-500 focus-visible:outline-2
                    ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorField message={error} />
        </>
    )

}
