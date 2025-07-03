'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const router = useRouter();

    const showError = (message: string) => {
        setErrorMsg(message);
        setUsername('');
        setPassword('');
        setTimeout(() => setErrorMsg(''), 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        const url =
            mode === 'login'
                ? 'http://localhost:3002/auth/login'
                : 'http://localhost:3002/auth/register';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                showError(mode === 'login' ? 'Login gagal' : 'Register gagal');
                return;
            }

            if (mode === 'login') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('selectedUsername', username);
                router.push('/dashboard');
            } else {
                setSuccessMsg('Registrasi berhasil! Silakan login.');
                setMode('login');
                setUsername('');
                setPassword('');
            }
        } catch (err) {
            showError(mode === 'login' ? 'Login gagal' : 'Register gagal');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    {mode === 'login' ? 'Login' : 'Register'}
                </h1>

                {errorMsg && (
                    <div className="bg-red-100 dark:bg-red-200 text-red-700 px-4 py-2 rounded mb-4">
                        {errorMsg}
                    </div>
                )}

                {successMsg && (
                    <div className="bg-green-100 dark:bg-green-200 text-green-700 px-4 py-2 rounded mb-4">
                        {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 p-2 w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-2 w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
                    >
                        {mode === 'login' ? 'Login' : 'Register'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    {mode === 'login' ? (
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Belum punya akun?{' '}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => {
                                    setMode('register');
                                    setErrorMsg('');
                                    setSuccessMsg('');
                                    setUsername('');
                                    setPassword('');
                                }}
                            >
                                Daftar di sini
                            </button>
                        </p>
                    ) : (
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Sudah punya akun?{' '}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => {
                                    setMode('login');
                                    setErrorMsg('');
                                    setSuccessMsg('');
                                    setUsername('');
                                    setPassword('');
                                }}
                            >
                                Login di sini
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
