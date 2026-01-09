import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import ErrorField from '@/components/error-field';
import { Form, Head, Link } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors, clearErrors }) => (
                    <div className="grid gap-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                autoFocus
                                required
                                autoComplete="email"
                                placeholder="email@example.com"
                                onFocus={() => clearErrors('email')}
                                className={`w-full rounded-md border px-3 py-2 text-sm transition
                                    focus:ring-1 focus:ring-blue-500
                                    ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />

                            <ErrorField message={errors.email} />
                        </div>

                        <div>
                            <div className="mb-1 flex items-center">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    Password
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        className="ml-auto text-sm underline"
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                autoComplete="current-password"
                                placeholder="Password"
                                onFocus={() => clearErrors('password')}
                                className={`w-full rounded-md border px-3 py-2 text-sm transition
                                    focus:ring-1 focus:ring-blue-500
                                    ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            />

                            <ErrorField message={errors.password} />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm"
                            >
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            data-test="login-button"
                            className="btn btn-primary btn-round mt-4 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50"
                        >
                            {processing ? 'Logging in…' : 'Log in'}
                        </button>
                    </div>
                )}
            </Form>

            {status && (
                <div className="mt-4 text-center text-sm font-medium text-green-600 animate-fade-in">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
