import { useState } from 'react';
import { Head } from '@inertiajs/react';
import SuccessMessage from '@/components/modal-success-message';
import ErrorMessage from '@/components/modal-error-message';
import Modal from '@/components/modal';
import ErrorField from '@/components/error-field';
import TextInput from '@/components/text-input';
import FileUpload from '@/components/file-upload';

interface PatientsCreateProps {
    onCancel: () => void;
    onSuccess: () => void;
}

export default function PatientsCreate({ onCancel, onSuccess }: PatientsCreateProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error' | null>(null);
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState(
        {
            first_name: '',
            last_name: '',
            email: '',
            country_code: '54',
            phone: '',
            document_image: null as File | null,
        }
    );

    function handleFileSelect(file: File) {
        setData({ ...data, document_image: file });

        if (errors.document_image) {
            setErrors((prev) => ({ ...prev, document_image: undefined }));
        }

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    }

    function handleFileRemove() {
        setData({ ...data, document_image: null });
        setPreview(null);

        if (errors.document_image) {
            setErrors((prev) => ({ ...prev, document_image: undefined }));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setProcessing(true);
        setModalOpen(false);

        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== null) formData.append(key, value as any);
            });

            const response = await fetch('/api/patients', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            });

            let resData: any = null;
            try {
                resData = await response.json();
            } catch (jsonErr) {
                console.error('Failed to parse JSON:', jsonErr);
            }

            if (!response.ok) {
                setErrors(resData.errors || {});
                setModalType('error');
            } else {
                setModalType('success');
                setData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    country_code: '54',
                    document_image: null,
                });
                setPreview(null);
            }
        } catch (err) {
            setModalType('error');
        } finally {
            setProcessing(false);
            setModalOpen(true);
        }
    }


    function handleChange(field: string, value: string | File) {
        setData({ ...data, [field]: value });

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    }


    return (
        <>
            <Head title="Add Patient" />

            <div className="mx-auto max-w-xl p-6">
                <div className="mb-4">
                    <button
                        onClick={onCancel}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                        ← Back to patients
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <TextInput
                            label="First name"
                            name="first_name"
                            value={data.first_name}
                            error={errors.first_name}
                            onChange={(value) => handleChange('first_name', value)}
                            onFocus={() => setErrors((prev) => ({ ...prev, first_name: undefined }))}
                            placeholder="John"
                        />
                    </div>

                    <div>
                        <TextInput
                            label="Last name"
                            name="last_name"
                            value={data.last_name}
                            error={errors.last_name}
                            onChange={(value) => handleChange('last_name', value)}
                            onFocus={() => setErrors((prev) => ({ ...prev, last_name: undefined }))}
                            placeholder="Doe"
                        />
                    </div>

                    <div>
                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            error={errors.email}
                            onChange={(value) => handleChange('email', value)}
                            onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                            placeholder="john@gmail.com"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Phone number *
                        </label>
                        <div className="flex gap-2">
                            <select
                                name="country_code"
                                value={data.country_code}
                                onChange={(e) => handleChange('country_code', e.target.value)}
                                onFocus={() => setErrors((prev) => ({ ...prev, country_code: undefined }))}
                                className={`rounded border px-3 py-2 focus:ring-1 focus:ring-blue-500 focus-visible:outline-2
                                    ${errors.country_code ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="54">🇦🇷 +54</option>
                                <option value="1">🇺🇸 +1</option>
                                <option value="34">🇪🇸 +34</option>
                                <option value="44">🇬🇧 +44</option>
                                <option value="49">🇩🇪 +49</option>
                                <option value="55">🇧🇷 +55</option>
                                <option value="57">🇨🇴 +57</option>
                            </select>

                            <TextInput
                                name="phone"
                                type="tel"
                                value={data.phone}
                                error={errors.phone}
                                onChange={(value) => handleChange('phone', value)}
                                onFocus={() => setErrors((prev) => ({ ...prev, phone: undefined }))}
                                placeholder="11 2345 6789"
                                showLabel={false}
                                showError={false}
                                required={true}
                            />
                        </div>
                        <ErrorField message={errors.phone} />
                        <ErrorField message={errors.country_code} />
                    </div>

                    <FileUpload
                        label="Document image"
                        name="document_image"
                        onFileSelect={handleFileSelect}
                        onRemove={handleFileRemove}
                        preview={preview}
                        error={errors.document_image}
                        accept="image/jpg,image/jpeg"
                        acceptedTypes={['image/jpeg', 'image/jpg']}
                        maxSizeInMB={2}
                        required={true}
                    />

                    <button
                        type="submit"
                        className="px-4 py-2 text-white btn btn-primary btn-round"
                        disabled={processing}
                    >
                        Add patient
                    </button>
                </form>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                {modalType === 'success' && (
                    <SuccessMessage
                        onClose={() => setModalOpen(false)}
                        onBackToList={onSuccess}
                    />
                )}

                {modalType === 'error' && (
                    <ErrorMessage onClose={() => setModalOpen(false)} />
                )}
            </Modal>
        </>
    );
}

