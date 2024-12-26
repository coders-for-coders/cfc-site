import { Link } from "react-router-dom";
import Highlight from 'react-highlight'
import { FaArrowDown } from 'react-icons/fa';
import '../stylesheets/code.css';
function Hero() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center relative overflow-hidden border border-gray-700/50 rounded-xl">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="lg:w-1/2 space-y-10">
                        <header className="space-y-6">
                            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text leading-tight">
                                Where Coders Unite & Thrive
                            </h1>
                            <p className="text-2xl text-gray-300 leading-relaxed">
                                Join a vibrant community of developers sharing knowledge, building projects, and growing together.
                            </p>
                        </header>
                        
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-gray-800/40 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors">
                                    <h3 className="font-semibold text-blue-400 text-lg mb-2">Collaborative Projects</h3>
                                    <p className="text-gray-300">Build real-world applications with fellow developers</p>
                                </div>
                                <div className="p-6 bg-gray-800/40 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                                    <h3 className="font-semibold text-purple-400 text-lg mb-2">Expert Code Reviews</h3>
                                    <p className="text-gray-300">Get valuable feedback from experienced peers</p>
                                </div>
                                <div className="p-6 bg-gray-800/40 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors">
                                    <h3 className="font-semibold text-blue-400 text-lg mb-2">Learning Resources</h3>
                                    <p className="text-gray-300">Access hand-picked tutorials and guides</p>
                                </div>
                                <div className="p-6 bg-gray-800/40 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                                    <h3 className="font-semibold text-purple-400 text-lg mb-2">Developer Network</h3>
                                    <p className="text-gray-300">Connect with passionate developers globally</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <Link to="https://discord.gg/GvW3vAabhH">
                                    <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
                                        Join Our Discord
                                    </button>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-gray-800"></div>
                                        ))}
                                    </div>
                                    <span className="text-gray-300">Join 1000+ developers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="p-8 bg-gray-800/40 rounded-xl backdrop-blur-sm border border-gray-700/50 shadow-xl hover:border-blue-500/50 transition-all transform hover:-translate-y-1">
                            <Highlight className="javascript">

{`// Join the most supportive coding community
async function startYourJourney() {
    const you = new Developer({
        passion: true,
        willToLearn: 100
    });
    
    const community = await Community.connect();
    await community.welcome(you);
    
    // Level up together!
    while (true) {
        you.learn();
        you.share();
        you.grow();
    }
}`}
                            </Highlight>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <FaArrowDown className="w-6 h-6 text-gray-400" />
        </div>
        </div>
    );
}

export default Hero;