import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAPI, categoryAPI } from '../services/api';
import './PostForm.css';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    categoryId: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Sadece teacher erişebilir
    if (user.role !== 'teacher') {
      navigate('/');
      return;
    }
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
      if (response.data.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: response.data[0].id }));
      }
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
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
      await postAPI.create(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Yazı oluşturulamadı');
    }
  };

  return (
    <div className="post-form-container">
      <button onClick={() => navigate('/')} className="btn-back">← Geri</button>
      
      <h2>Yeni Yazı Oluştur</h2>
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
            placeholder="Yazı başlığını girin"
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
            placeholder="https://example.com/image.jpg"
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
            placeholder="Yazı içeriğini girin"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Yazıyı Yayınla</button>
          <button type="button" onClick={() => navigate('/')} className="btn-secondary">
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
