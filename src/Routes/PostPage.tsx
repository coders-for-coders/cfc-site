import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaBookOpen, FaLaptopCode, FaQuestion, FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Comment {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

interface PostMetadata {
  created_at: string;
  updated_at?: string;
  type: string;
  icon?: string;
  author: string;
  tags: string[];
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

interface Post {
  id: string;
  metadata: PostMetadata;
  content: PostContent;
}

function PostPage() {
  const { id } = useParams<{ type: string; id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        const url = `http://localhost:8000/api/data/post/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (!id) {
      setError('Post ID is required');
      setLoading(false);
      return;
    }

    fetchPost();
  }, [id]);

  const getIcon = (iconName: string) => {
    const IconComponent = {
      'book': FaBookOpen,
      'code': FaLaptopCode,
      'question': FaQuestion, 
      'github': FaGithub,
      'python': FaLaptopCode
    }[iconName] || FaBookOpen;

    return <IconComponent className="text-emerald-400 text-4xl group-hover:text-emerald-300 transition-all duration-300" />;
  };

  const formatDescription = (text: string) => {
    return text.split('```').map((part, index) => {
      if (index % 2 === 1) {
        const [language, ...code] = part.trim().split('\n');
        return (
          <SyntaxHighlighter
            key={index}
            language={language || 'text'}
            style={theme}
            className="rounded-2xl my-10 shadow-2xl border border-emerald-900/30 hover:border-emerald-500/30 transition-all duration-300"
          >
            {code.join('\n')}
          </SyntaxHighlighter>
        );
      }
      return <div key={index} className="mb-8 leading-relaxed text-slate-200 text-lg" dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-3">
          {/* <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div> */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="text-rose-400 text-xl font-medium bg-rose-950/40 px-10 py-6 rounded-2xl border border-rose-900/40 shadow-2xl backdrop-blur-sm max-w-lg text-center">
          <div className="text-rose-300 text-3xl mb-3">⚠️</div>
          {error}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-slate-400 text-xl font-medium bg-slate-800/50 px-10 py-6 rounded-2xl border border-slate-700/30 shadow-2xl backdrop-blur-sm">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white relative">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
      </div>

      <Navbar />

      <div className="relative">
        <div className="absolute top-60 right-10 w-[30rem] h-[30rem] bg-purple-500/5 rounded-full blur-[128px] animate-pulse [animation-delay:2s]" />
        
        <article className="max-w-5xl mx-auto px-6 py-20">
          <header className="space-y-12 mb-20">
            <div className="flex items-center gap-8">
              <div className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-3xl border border-emerald-500/10 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:shadow-emerald-500/5 hover:shadow-2xl">
                {getIcon(post.metadata.icon || '')}
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-emerald-400/90 text-sm font-semibold tracking-wider uppercase bg-emerald-950/30 px-4 py-1.5 rounded-full w-fit">
                  {post.metadata.type.charAt(0).toUpperCase() + post.metadata.type.slice(1)} Post
                </span>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-200">
                  {post.content.title}
                </h1>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl" />
              <div className="relative text-xl text-slate-200 pl-10 py-8 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: post.content.description }} />
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-10 shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="text-slate-200 leading-relaxed text-lg">
                {formatDescription(post.content.long_description || post.content.description)}
              </div>
              
              <div className="mt-12 pt-10 border-t border-slate-700/50">
                <div className="text-slate-200 leading-relaxed whitespace-pre-line text-lg">
                  {post.content.content}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default PostPage;