import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaBold, FaItalic, FaCode, FaLink } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CreatePostForm {
  title: string;
  description: string;
  longDescription: string;
  content: string;
  type: string;
  icon: string;
  tags: string[];
}

function CreatePost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CreatePostForm>({
    title: '',
    description: '',
    longDescription: '',
    content: '',
    type: 'tutorial',
    icon: 'book',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [showFormatButtons, setShowFormatButtons] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/data/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metadata: {
            type: form.type,
            icon: form.icon,
            author: 'user', // TODO: Get from auth context
            tags: form.tags
          },
          content: {
            title: form.title,
            description: form.description,
            long_description: form.longDescription,
            content: form.content,
            likes: 0,
            comments: []
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFormat = (tag: string, ref: React.RefObject<HTMLTextAreaElement>, field: 'longDescription' | 'content') => {
    if (!ref.current) return;

    const textarea = ref.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = form[field].substring(start, end);
    
    const beforeText = form[field].substring(0, start);
    const afterText = form[field].substring(end);

    let formattedText = '';
    switch(tag) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'code':
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          formattedText = `[${selectedText}](${url})`;
        } else {
          return;
        }
        break;
      default:
        formattedText = selectedText;
    }

    setForm(prev => ({
      ...prev,
      [field]: beforeText + formattedText + afterText
    }));

    // Restore focus and update cursor position
    textarea.focus();
    const newCursorPos = start + formattedText.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    setShowFormatButtons(false);
  };

  const handleSelect = () => {
    if (!textareaRef.current && !contentRef.current) return;
    
    const textarea = textareaRef.current;
    const content = contentRef.current;
    
    if ((textarea && textarea.selectionStart !== textarea.selectionEnd) || 
        (content && content.selectionStart !== content.selectionEnd)) {
      setShowFormatButtons(true);
    }
  };

  const renderFormattedText = (text: string) => {
    let formattedText = text;
    // Convert markdown-style formatting to HTML
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>');
    
    // Handle code blocks
    const parts = formattedText.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) { // Code block
        return (
          <SyntaxHighlighter
            key={index}
            language="text"
            style={theme}
            className="my-2 rounded"
          >
            {part.trim()}
          </SyntaxHighlighter>
        );
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white">Creating post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-white text-center">Create New Post</h1>
        
        {error && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500 rounded text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          <div>
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Short Description</label>
            <input
              type="text"
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Long Description</label>
            {showFormatButtons && (
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => handleFormat('bold', textareaRef, 'longDescription')}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
                >
                  <FaBold />
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('italic', textareaRef, 'longDescription')}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
                >
                  <FaItalic />
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('code', textareaRef, 'longDescription')}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
                >
                  <FaCode />
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('link', textareaRef, 'longDescription')}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
                >
                  <FaLink />
                </button>
              </div>
            )}
            <div className="space-y-4">
              <textarea
                ref={textareaRef}
                id="longDescription"
                value={form.longDescription}
                onChange={e => setForm(prev => ({ ...prev, longDescription: e.target.value }))}
                onSelect={handleSelect}
                onBlur={() => setTimeout(() => setShowFormatButtons(false), 200)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-32"
              />
              {form.longDescription && (
                <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
                  <h3 className="text-white mb-2 text-sm font-medium">Preview:</h3>
                  <div className="text-white">
                    {renderFormattedText(form.longDescription)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Content</label>
            {showFormatButtons && (
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => handleFormat('bold', contentRef, 'content')}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
                >
                  <FaBold />
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('italic', contentRef, 'content')}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
                >
                  <FaItalic />
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('code', contentRef, 'content')}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
                >
                  <FaCode />
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat('link', contentRef, 'content')}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
                >
                  <FaLink />
                </button>
              </div>
            )}
            <div className="space-y-4">
              <textarea
                ref={contentRef}
                value={form.content}
                onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
                onSelect={handleSelect}
                onBlur={() => setTimeout(() => setShowFormatButtons(false), 200)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-64"
                required
              />
              {form.content && (
                <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
                  <h3 className="text-white mb-2 text-sm font-medium">Preview:</h3>
                  <div className="text-white">
                    {renderFormattedText(form.content)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Type</label>
            <select
              value={form.type}
              onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            >
              <option value="tutorial">Tutorial</option>
              <option value="article">Article</option>
              <option value="question">Question</option>
              <option value="project">Project</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Icon</label>
            <select
              value={form.icon}
              onChange={e => setForm(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            >
              <option value="book">Book</option>
              <option value="code">Code</option>
              <option value="question">Question</option>
              <option value="github">GitHub</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              {form.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-sm hover:text-blue-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
