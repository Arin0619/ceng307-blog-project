import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postAPI, commentAPI } from '../services/api';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthor = user.id === post?.authorId;

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      const response = await postAPI.getById(id);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Yazı yüklenirken hata:', error);
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await postAPI.like(id);
      loadPost(); // Yenile
    } catch (error) {
      console.error('Beğeni hatası:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await commentAPI.create({
        content: comment,
        postId: parseInt(id),
      });
      setComment('');
      loadPost(); // Yorumları yenile
    } catch (error) {
      console.error('Yorum eklenirken hata:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Yorumu silmek istediğinize emin misiniz?')) return;

    try {
      await commentAPI.delete(commentId);
      loadPost();
    } catch (error) {
      console.error('Yorum silinirken hata:', error);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Yazıyı silmek istediğinize emin misiniz?')) return;

    try {
      await postAPI.delete(id);
      navigate('/');
    } catch (error) {
      console.error('Yazı silinirken hata:', error);
    }
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (!post) {
    return <div className="error">Yazı bulunamadı.</div>;
  }

  return (
    <div className="post-detail-container">
      <button onClick={() => navigate('/')} className="btn-back">← Geri</button>

      <article className="post-detail">
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="post-image-large" />
        )}

        <h1>{post.title}</h1>

        <div className="post-info">
          <span>👤 {post.author?.name}</span>
          <span>📁 {post.category?.name}</span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
        </div>

        <div className="post-actions">
          <button onClick={handleLike} className="btn-like">
            ❤️ Beğen ({post.likes})
          </button>
          {isAuthor && (
            <>
              <button onClick={() => navigate(`/edit-post/${id}`)} className="btn-edit">
                ✏️ Düzenle
              </button>
              <button onClick={handleDeletePost} className="btn-delete">
                🗑️ Sil
              </button>
            </>
          )}
        </div>

        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </article>

      {/* Yorumlar */}
      <div className="comments-section">
        <h2>Yorumlar ({post.comments?.length || 0})</h2>

        {/* Yorum Ekleme Formu */}
        {user.id && (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Yorumunuzu yazın..."
              rows="3"
              required
            />
            <button type="submit" className="btn-primary">Yorum Yap</button>
          </form>
        )}

        {/* Yorum Listesi */}
        <div className="comments-list">
          {post.comments?.length === 0 ? (
            <p className="no-comments">Henüz yorum yok.</p>
          ) : (
            post.comments?.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <strong>{comment.user?.name}</strong>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <p>{comment.content}</p>
                {(user.id === comment.userId || user.role === 'teacher') && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="btn-delete-comment"
                  >
                    Sil
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
