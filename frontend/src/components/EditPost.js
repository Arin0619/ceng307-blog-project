import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postAPI, categoryAPI } from '../services/api';
import './PostForm.css';

function EditPost() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    categoryId: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [postRes, categoriesRes] = await Promise.all([
        postAPI.getById(id),
        categoryAPI.getAll(),
      ]);

      const post = postRes.data;
      
      // Sadece yazar düzenleyebilir
      if (post.authorId !== user.id) {
        navigate('/');
        return;
      }

      setFormData({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl || '',
        categoryId: post.categoryId,
      });
      setCategories(categoriesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await postAPI.update(id, formData);
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Yazı güncellenemedi');
    }
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="post-form-container">
      <button onClick={() => navigate(`/post/${id}`)} className="btn-back">← Geri</button>
      
      <h2>Yazıyı Düzenle</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Başlık:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Kategori:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Resim URL (Opsiyonel):</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>İçerik:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Değişiklikleri Kaydet</button>
          <button type="button" onClick={() => navigate(`/post/${id}`)} className="btn-secondary">
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
