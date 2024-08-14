import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface LoginFormProps {
    onLoginSuccess: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { username, password });
            onLoginSuccess(response.data.access_token);
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-2 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300">
                    Login
                </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 hover:text-blue-700 underline">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
