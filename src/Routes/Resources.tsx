import Navbar from '../components/Navbar';
import { ResourceCard } from '../components/ResourceCard';
import { FaBook, FaVideo, FaUsers } from 'react-icons/fa';
import { ReactElement } from 'react';

interface Resource {
  title: string;
  description: string;
  link: string;
  icon: ReactElement;
}

function Resources() {
  const resources: Resource[] = [
    {
      title: "Documentation",
      description: "Official documentation and guides",
      link: "#",
      icon: <FaBook />
    },
    {
      title: "Tutorials", 
      description: "Step-by-step learning materials",
      link: "#",
      icon: <FaVideo />
    },
    {
      title: "Community",
      description: "Forums and discussion groups",
      link: "#", 
      icon: <FaUsers />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden border border-gray-700/50 rounded-xl">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-[30px] font-bold mb-12 text-white text-center">Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              link={resource.link}
              icon={resource.icon}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/10 rounded-full blur-3xl"></div>
    </div>
  );
}

export default Resources;
