import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function Home () {
    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-br from-gray-900 to-gray-800">
                <Hero />
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Community</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Diverse & Inclusive</h3>
                            <p className="text-gray-300">We welcome members from all backgrounds, creating a rich and vibrant community where everyone belongs.</p>
                        </div>
                        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3 text-purple-400">Supportive Network</h3>
                            <p className="text-gray-300">Our members support each other through knowledge sharing, mentorship, and collaboration.</p>
                        </div>
                        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Growing Together</h3>
                            <p className="text-gray-300">Join us in our journey of continuous learning and professional development.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
