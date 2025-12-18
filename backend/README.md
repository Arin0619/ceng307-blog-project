# Blog Backend - NestJS

Basit Blog Yönetim Sistemi için Backend API

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npm run start:dev
```

Backend http://localhost:5000 adresinde çalışacak.

## Veritabanı

SQLite kullanılıyor. İlk çalıştırmada `blog.db` dosyası otomatik oluşturulur.

## API Endpoint'leri

### Auth (Kimlik Doğrulama)
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

### Posts (Blog Yazıları)
- `GET /api/posts` - Tüm yazıları getir
- `GET /api/posts/:id` - Tek yazı detayı
- `POST /api/posts` - Yeni yazı oluştur (Sadece Teacher)
- `PUT /api/posts/:id` - Yazıyı güncelle (Sadece Yazar)
- `DELETE /api/posts/:id` - Yazıyı sil (Sadece Yazar)
- `POST /api/posts/:id/like` - Yazıyı beğen

### Comments (Yorumlar)
- `GET /api/comments/post/:postId` - Yazının yorumlarını getir
- `POST /api/comments` - Yeni yorum ekle
- `DELETE /api/comments/:id` - Yorumu sil

### Categories (Kategoriler)
- `GET /api/categories` - Tüm kategorileri getir
- `GET /api/categories/:id` - Kategori detayı
- `POST /api/categories` - Yeni kategori (Sadece Teacher)
- `PUT /api/categories/:id` - Kategoriyi güncelle (Sadece Teacher)
- `DELETE /api/categories/:id` - Kategoriyi sil (Sadece Teacher)

## Teknolojiler

- NestJS - Backend framework
- TypeORM - ORM
- SQLite - Veritabanı
- JWT - Token tabanlı kimlik doğrulama
- Bcrypt - Şifre hashleme
