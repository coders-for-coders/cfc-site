import { FC, ReactElement } from 'react';


interface ResourceCardProps {
  title: string;
  description: string;
  icon: ReactElement;
  onClick: () => void;
}

export const ResourceCard: FC<ResourceCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="block p-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-md hover:border-blue-500/50 transition-all transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">{icon}</span>
        <h2 className="text-xl font-semibold text-blue-400">{title}</h2>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};
