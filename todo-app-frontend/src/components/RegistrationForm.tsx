import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface RegistrationFormProps {
    onRegisterSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegisterSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', { username, password });
            onRegisterSuccess();
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Register</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-2 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition duration-300">
                    Register
                </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:text-blue-700 underline">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default RegistrationForm;
