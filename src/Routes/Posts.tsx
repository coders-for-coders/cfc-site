import Navbar from '../components/Navbar';
import { ResourceCard } from '../components/ResourceCard';
import { FaBookOpen, FaLaptopCode, FaQuestion, FaQuestionCircle, FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Comment {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

interface PostContent {
  title: string;
  description: string;
  long_description?: string;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
}

interface PostMetadata {
  created_at: string;
  updated_at?: string;
  type: string;
  icon?: string;
  author: string;
  tags: string[];
}

interface Post {
  id: string;
  metadata: PostMetadata;
  content: PostContent;
}

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/data/post');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getIcon = (iconName: string | undefined) => {
    if (!iconName) return <FaBookOpen className="text-blue-400 text-4xl" />;
    
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
        <h1 className="text-5xl font-bold mb-12 text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Posts
        </h1>
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-gray-400 text-lg">No posts yet</p>
            <button
              onClick={() => navigate('/posts/create')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <ResourceCard
                key={post.id}
                title={post.content.title}
                description={post.content.description}
                icon={getIcon(post.metadata.icon)}
                onClick={() => navigate(`/posts/${post.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/20 rounded-full blur-3xl"></div>
    </div>
  );
}

export default Posts;
