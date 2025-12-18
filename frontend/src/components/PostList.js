import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAPI, categoryAPI } from '../services/api';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [postsRes, categoriesRes] = await Promise.all([
        postAPI.getAll(),
        categoryAPI.getAll(),
      ]);
      setPosts(postsRes.data);
      setCategories(categoriesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.categoryId === parseInt(selectedCategory));

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="post-list-container">
      <div className="header">
        <h1>Blog Yazıları</h1>
        {user.role === 'teacher' && (
          <button onClick={() => navigate('/create-post')} className="btn-primary">
            Yeni Yazı Oluştur
          </button>
        )}
      </div>

      {/* Kategori Filtresi */}
      <div className="category-filter">
        <label>Kategori: </label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">Tümü</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Yazı Listesi */}
      <div className="posts-grid">
        {filteredPosts.length === 0 ? (
          <p className="no-posts">Henüz yazı yok.</p>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="post-image" />
              )}
              <div className="post-content">
                <h3>{post.title}</h3>
                <p className="post-excerpt">
                  {post.content.substring(0, 150)}...
                </p>
                <div className="post-meta">
                  <span className="author">👤 {post.author?.name}</span>
                  <span className="category">📁 {post.category?.name}</span>
                  <span className="likes">❤️ {post.likes}</span>
                </div>
                <div className="post-date">
                  {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostList;
