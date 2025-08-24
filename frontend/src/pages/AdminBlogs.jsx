import React, { useState } from 'react';
import AIBlogGenerator from '../components/AIBlogGenerator.jsx';

const AdminBlogs = () => {
  const [aiBlogs, setAIBlogs] = useState([]);

  const handleAIBlogCreated = (blog) => {
    // Here you would send the blog to your backend to save it as a new blog post
    // For now, just add to local state
    setAIBlogs(prev => [blog, ...prev]);
  };

  return (
    <div>
      <h1>Admin Blogs</h1>
      <AIBlogGenerator onBlogCreated={handleAIBlogCreated} />
      <div style={{ marginTop: '2rem' }}>
        <h2>AI-Generated Blogs</h2>
        {aiBlogs.length === 0 && <p>No AI-generated blogs yet.</p>}
        {aiBlogs.map((blog, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{blog.title} <span style={{ color: 'green', fontWeight: 'bold' }}>[AI-Generated]</span></h3>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBlogs
