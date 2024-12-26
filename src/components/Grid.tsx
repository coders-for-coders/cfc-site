    

function Grid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <div className="p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">💻</div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Web Development</h3>
                <p className="text-gray-400">Learn modern web development with React, Node.js and more</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Mobile Development</h3>
                <p className="text-gray-400">Build native mobile apps with React Native and Flutter</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">⚙️</div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Backend Development</h3>
                <p className="text-gray-400">Master server-side programming and databases</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-colors">
                <div className="text-3xl mb-2">☁️</div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Cloud Computing</h3>
                <p className="text-gray-400">Deploy and scale applications in the cloud</p>
            </div>
        </div>
    );
}

export default Grid;
