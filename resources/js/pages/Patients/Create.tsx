import { useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SuccessMessage from '@/components/modal-success-message';
import ErrorMessage from '@/components/modal-error-message';
import Modal from '@/components/modal';
import ErrorField from '@/components/error-field';
import TextInput from '@/components/text-input';

export default function Create() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
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

    /* const { data, setData, post, processing, errors, clearErrors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        country_code: '54',
        phone: '',
        document_image: null as File | null,
    }); */

    function handleFile(file: File) {
        if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
            alert('Only JPG or JPEG images are allowed');
            return;
        }

        setData({ ...data, document_image: file });
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
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

            console.log(formData)

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
                console.log(resData.errors)
                setErrors(resData.errors || {});
                setModalType('error');
            } else {
                setModalType('success');
                setData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    country_code: '',
                    document_image: null,
                });
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

        // Clear the error for this field when typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    }


    return (
        <>
            <Head title="Create Patient" />

            <div className="mx-auto max-w-xl p-6">
                <h1 className="mb-6 text-2xl font-semibold">
                    Register new patient
                </h1>

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
                            value={data.email}
                            error={errors.email}
                            onChange={(value) => handleChange('email', value)}
                            onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                            placeholder="Doe"
                        />
                    </div>

                    <div className="">
                        <div className="flex gap-2">
                            <select
                                name="country_code"
                                value={data.country_code}
                                onChange={(e) => handleChange('country_code', e.target.value)}
                                onFocus={() => setErrors((prev) => ({ ...prev, country_code: undefined }))}
                                className={`rounded border px-2 py-2
                                    ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="1">🇺🇸 +1</option>
                                <option value="34">🇪🇸 +34</option>
                                <option value="44">🇬🇧 +44</option>
                                <option value="49">🇩🇪 +49</option>
                                <option value="sdasd">🇦🇷 +54</option>
                                <option value="55">🇧🇷 +55</option>
                                <option value="57">🇨🇴 +57</option>
                            </select>

                            <input
                                type="tel"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                onFocus={() => setErrors((prev) => ({ ...prev, phone: undefined }))}
                                placeholder="11 2345 6789"
                                className={`w-full rounded border px-3 py-2 focus:ring-1 focus:ring-blue-500 focus-visible:outline-2
                                    ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        <ErrorField message={errors.country_code} />
                        <ErrorField message={errors.phone} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Document image *
                        </label>

                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={onDrop}
                            className={`flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed p-6 text-center ${
                                isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
                            }`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-32 w-32 rounded object-cover"
                                />
                            ) : (
                                <>
                                    <p className="text-sm">
                                        Drag and drop an image here
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        or{' '}
                                        <span className="underline">
                                            choose a file
                                        </span>
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        JPG or JPEG only
                                    </p>
                                </>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpg,image/jpeg"
                            className="hidden"
                            name="document_image"
                            onChange={onFileChange}
                        />
                        <ErrorField message={errors.document_image} />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded bg-black px-4 py-2 text-white"
                        disabled={processing}
                    >
                        Create patient
                    </button>
                </form>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                {modalType === 'success' && (
                    <SuccessMessage onClose={() => setModalOpen(false)} />
                )}

                {modalType === 'error' && (
                    <ErrorMessage onClose={() => setModalOpen(false)} />
                )}
            </Modal>
        </>
    );
}
