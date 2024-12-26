import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

function Navbar() {
    return (
        <nav className="bg-gray-900/80 backdrop-blur-sm fixed w-full z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                        Coders for Coders
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">
                            Projects
                        </Link>
                        <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">
                            Resources
                        </Link>
                        <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                            <FiLogIn /> Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
