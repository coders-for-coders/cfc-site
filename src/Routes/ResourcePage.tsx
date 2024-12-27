import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaBookOpen, FaLaptopCode, FaQuestion, FaQuestionCircle, FaGithub } from 'react-icons/fa';
import { ReactElement } from 'react';

interface ResourceConfig {
  title: string;
  gradientColors: string[];
  bgColor: string;
  icon: ReactElement;
}

function ResourcePage() {
  const { type } = useParams<{ type: string }>();

  const resourceConfigs: { [key: string]: ResourceConfig } = {
    notes: {
      title: "Study Notes",
      gradientColors: ['from-blue-400', 'to-purple-400'],
      bgColor: 'bg-blue-500/20',
      icon: <FaBookOpen className="text-blue-400 text-4xl mb-4" />
    },
    ebooks: {
      title: "E-Books",
      gradientColors: ['from-green-400', 'to-purple-400'],
      bgColor: 'bg-green-500/20',
      icon: <FaLaptopCode className="text-green-400 text-4xl mb-4" />
    },
    questions: {
      title: "Practice Questions",
      gradientColors: ['from-yellow-400', 'to-purple-400'],
      bgColor: 'bg-yellow-500/20',
      icon: <FaQuestion className="text-yellow-400 text-4xl mb-4" />
    },
    quiz: {
      title: "Interactive Quiz",
      gradientColors: ['from-purple-400', 'to-blue-400'],
      bgColor: 'bg-purple-500/20',
      icon: <FaQuestionCircle className="text-purple-400 text-4xl mb-4" />
    },
    github: {
      title: "Github Repositories",
      gradientColors: ['from-gray-400', 'to-blue-400'],
      bgColor: 'bg-gray-500/20',
      icon: <FaGithub className="text-gray-400 text-4xl mb-4" />
    }
  };

  const config = resourceConfigs[type || 'notes'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden border border-gray-700/50 rounded-xl">
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-20 w-72 h-72 ${config.bgColor} rounded-full blur-3xl`}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex flex-col items-center mb-12">
          {config.icon}
          <h1 className={`text-4xl font-bold text-white text-center bg-clip-text text-transparent bg-gradient-to-r ${config.gradientColors.join(' ')}`}>
            {config.title}
          </h1>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
          {/* Add your dynamic content here based on the type */}
          <p className="text-gray-300">Content for {config.title} will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}

export default ResourcePage; 