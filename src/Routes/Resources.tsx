import Navbar from '../components/Navbar';
import { ResourceCard } from '../components/ResourceCard';
import { FaBookOpen, FaLaptopCode, FaQuestion, FaQuestionCircle, FaGithub } from 'react-icons/fa';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

interface Resource {
  title: string;
  description: string;
  link: string;
  icon: ReactElement;
}

function Resources() {
  const navigate = useNavigate();

  const resources: Resource[] = [
    {
      title: "Notes",
      description: "Study notes and summaries",
      link: "notes",
      icon: <FaBookOpen className="text-blue-400" />
    },
    {
      title: "E-Books",
      description: "Digital books and reading materials", 
      link: "ebooks",
      icon: <FaLaptopCode className="text-green-400" />
    },
    {
      title: "Questions",
      description: "Practice questions and exercises",
      link: "questions",
      icon: <FaQuestion className="text-yellow-400" />
    },
    {
      title: "Quiz",
      description: "Interactive quizzes and tests",
      link: "quiz",
      icon: <FaQuestionCircle className="text-purple-400" />
    },
    {
      title: "Github Repos",
      description: "Code repositories and examples",
      link: "github",
      icon: <FaGithub className="text-gray-400" />
    }
  ];

  const handleCardClick = (link: string) => {
    navigate(`/resources/${link}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden border border-gray-700/50 rounded-xl">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              link={resource.link}
              icon={resource.icon}
              onClick={() => handleCardClick(resource.link)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/20 rounded-full blur-3xl"></div>
    </div>
  );
}

export default Resources;
