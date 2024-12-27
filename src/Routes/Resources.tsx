import Navbar from '../components/Navbar';
import { ResourceCard } from '../components/ResourceCard';
import { FaBookOpen, FaLaptopCode, FaQuestion, FaQuestionCircle, FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Resource {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  type: string;
  icon: string;
  path: string;
}

function Resources() {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/resources');
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaBookOpen':
        return <FaBookOpen className="text-blue-400 text-4xl" />;
      case 'FaLaptopCode':
        return <FaLaptopCode className="text-green-400 text-4xl" />;
      case 'FaQuestion':
        return <FaQuestion className="text-yellow-400 text-4xl" />;
      case 'FaQuestionCircle':
        return <FaQuestionCircle className="text-purple-400 text-4xl" />;
      case 'FaGithub':
        return <FaGithub className="text-gray-400 text-4xl" />;
      default:
        return <FaBookOpen className="text-blue-400 text-4xl" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

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
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              icon={getIcon(resource.icon)}
              onClick={() => navigate(`/resources/${resource.id}`)}
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
