import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement login logic
        console.log('Login attempt with:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDiscordLogin = () => {
        // TODO: Implement Discord OAuth
        console.log('Discord login clicked');
    };

    const handleGithubLogin = () => {
        // TODO: Implement Github OAuth
        console.log('Github login clicked');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center relative overflow-hidden border border-gray-700/50 rounded-xl">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 flex justify-center">
                <div className="w-full max-w-md p-8 bg-gray-800/40 rounded-xl backdrop-blur-sm border border-gray-700/50 shadow-xl">
                    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                        Welcome Back
                    </h2>

                    <div className="space-y-4 mb-8">
                        <button
                            onClick={handleDiscordLogin}
                            className="w-full py-3 bg-[#5865F2] text-white font-semibold rounded-lg hover:bg-[#4752C4] transition-colors flex items-center justify-center gap-2"
                        >
                            <FaDiscord size={20} />
                            Continue with Discord
                        </button>

                        {/* <button
                            onClick={handleGithubLogin}
                            className="w-full py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                        > */}
                        <div className="w-full py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                            <Link to="http://localhost:8000/api/auth/github/login">
                                <FaGithub size={20} className="text-gray-800" />
                                Continue with Github
                            </Link>
                        </div>
                        {/* </button> */}
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800/50 text-gray-400">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-200"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Sign In
                        </button>
                    </form>
                    <p className="mt-6 text-center text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/10 rounded-full blur-3xl"></div>
        </div>
    );
}

export default LoginForm;
