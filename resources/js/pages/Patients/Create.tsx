import { useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SuccessMessage from '@/components/modal-success-message';
import ErrorMessage from '@/components/modal-error-message';
import Modal from '@/components/modal';

export default function Create() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error' | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        country_code: '54',
        phone: '',
        document_image: null as File | null,
    });

    function handleFile(file: File) {
        if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
            alert('Only JPG or JPEG images are allowed');
            return;
        }

        setData('document_image', file);
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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post(route('patients.store'), {
            forceFormData: true,
            onSuccess: () => {
                setModalType('success');
            },
            onError: (errors) => {
                console.log(errors)
                setModalType('error');
            },
        });

        setModalOpen(true);

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
                        <label className="mb-1 block text-sm font-medium">
                            First name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                            className="w-full rounded border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Last name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                            className="w-full rounded border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            className="w-full rounded border px-3 py-2"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            name="country_code"
                            value={data.country_code}
                            onChange={(e) => setData('country_code', e.target.value)}
                            className="rounded border px-2 py-2"
                        >
                            <option value="1">🇺🇸 +1</option>
                            <option value="34">🇪🇸 +34</option>
                            <option value="44">🇬🇧 +44</option>
                            <option value="49">🇩🇪 +49</option>
                            <option value="54">🇦🇷 +54</option>
                            <option value="55">🇧🇷 +55</option>
                            <option value="57">🇨🇴 +57</option>
                        </select>

                        <input
                            type="tel"
                            name="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="11 2345 6789"
                            className="w-full rounded border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Document image
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
