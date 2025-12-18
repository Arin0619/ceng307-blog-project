# Blog Yönetim Sistemi - CENG 307 Projesi

Basit ve anlaşılır bir blog platformu. Öğretmenler yazı yazar, öğrenciler okur ve yorum yapar.

## 📋 Proje Özeti

- **Frontend**: React 18
- **Backend**: NestJS  
- **Veritabanı**: SQLite
- **Kimlik Doğrulama**: JWT

## 🎯 Özellikler

### Öğrenci (Okuyucu):
- ✅ Blog yazılarını okuma
- ✅ Yorum yapma
- ✅ Yazıları beğenme
- ✅ Kategori filtreleme

### Öğretmen (Yazar):
- ✅ Yukarıdaki tüm özellikler
- ✅ Yeni yazı oluşturma
- ✅ Yazıları düzenleme/silme
- ✅ Kategori yönetimi

## 📁 Proje Yapısı

```
blog-project/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── entities/       # Veritabanı modelleri (4 tablo)
│   │   ├── controllers/    # API endpoint'leri
│   │   ├── guards/         # Yetkilendirme
│   │   └── strategies/     # JWT stratejisi
│   └── package.json
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/    # React component'leri
│   │   ├── services/      # API iletişimi
│   │   └── App.js         # Ana uygulama
│   └── package.json
│
└── CENG307_Blog_Projesi_Rapor.pdf    # Detaylı proje raporu
```

## 🚀 Kurulum ve Çalıştırma

### Backend:
```bash
cd backend
npm install
npm run start:dev
# Backend: http://localhost:5000
```

### Frontend:
```bash
cd frontend
npm install
npm start
# Frontend: http://localhost:3000
```

## 📊 Veritabanı (4 Tablo)

1. **Users** - Kullanıcılar (öğrenci/öğretmen)
2. **Categories** - Kategoriler
3. **Posts** - Blog yazıları
4. **Comments** - Yorumlar

## 🔐 API Endpoint'leri

### Auth
- `POST /api/auth/register` - Kayıt
- `POST /api/auth/login` - Giriş

### Posts
- `GET /api/posts` - Tüm yazılar
- `POST /api/posts` - Yeni yazı (Teacher)
- `PUT /api/posts/:id` - Güncelle (Yazar)
- `DELETE /api/posts/:id` - Sil (Yazar)

### Comments
- `GET /api/comments/post/:postId` - Yorumları getir
- `POST /api/comments` - Yorum ekle
- `DELETE /api/comments/:id` - Yorum sil

### Categories
- `GET /api/categories` - Kategoriler
- `POST /api/categories` - Yeni kategori (Teacher)

## 📝 Component'ler

- **App.js** - Ana uygulama ve routing
- **Navbar.js** - Navigasyon menüsü
- **Login.js** - Giriş sayfası
- **Register.js** - Kayıt sayfası
- **PostList.js** - Yazı listesi (filtreleme ile)
- **PostDetail.js** - Yazı detayı ve yorumlar
- **CreatePost.js** - Yazı oluşturma (Teacher)
- **EditPost.js** - Yazı düzenleme (Yazar)

## 🎓 Sunumda Sorulabilecek Sorular ve Cevapları

### "User entity nasıl çalışıyor?"
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()  // Otomatik ID
  id: number;
  
  @Column({ unique: true })  // Unique email
  email: string;
  
  @Column()
  password: string;  // Hashlenmiş şifre
  
  @Column({ default: 'student' })  // Rol: student veya teacher
  role: string;
  
  @OneToMany(() => Post, post => post.author)  // İlişki
  posts: Post[];
}
```

### "JWT nasıl çalışıyor?"
1. Kullanıcı giriş yapar
2. Backend, şifreyi kontrol eder
3. Doğruysa JWT token oluşturulur (id, email, role içerir)
4. Token frontend'e gönderilir
5. Frontend, her istekte bu token'ı gönderir
6. Backend, token'ı doğrular ve yetkiye bakar

### "PostList component'i nasıl çalışıyor?"
```javascript
function PostList() {
  const [posts, setPosts] = useState([]);  // State
  
  useEffect(() => {
    // Sayfa yüklenince verileri çek
    postAPI.getAll().then(res => setPosts(res.data));
  }, []);
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### "Öğretmen kontrolü nasıl yapılıyor?"
Backend'de:
```typescript
@Post()
@UseGuards(JwtAuthGuard)  // Token kontrol
async createPost(@Request() req) {
  if (req.user.role !== 'teacher') {
    throw new HttpException('Only teachers can create', 403);
  }
  // Yazı oluştur...
}
```

## 💡 Önemli Notlar

- Kodlar **basit ve anlaşılır** tutulmuştur
- Her dosyanın **tek bir görevi** vardır
- **4 tablo** (Users, Posts, Comments, Categories)
- **2 rol** (Student, Teacher)
- **CRUD işlemleri** tam çalışır
- **JWT ile güvenli** kimlik doğrulama

## 📖 Detaylı Bilgi

Tüm detaylar için **CENG307_Blog_Projesi_Rapor.pdf** dosyasına bakın:
- API endpoint'leri detaylı açıklamalar
- Veritabanı diyagramı
- Component açıklamaları
- Kod örnekleri
- Kurulum adımları

## 🎯 Sunumda Öneriler

1. **Önce genel sistemi anlat**: "2 rol var, teacher yazı yazar, student okur"
2. **Backend'i açıkla**: "4 entity var, TypeORM kullanıyoruz, JWT ile korumalı"
3. **Frontend'i açıkla**: "React hooks kullanıyoruz, axios ile API'ye istek atıyoruz"
4. **Canlı göster**: Kayıt ol, yazı oluştur, yorum yap
5. **Kodu göster**: Basit bir entity veya component'i açıkla

## ✅ Başarıyla Tamamlanan Gereksinimler

- ✅ Frontend: React kullanıldı
- ✅ Backend: NestJS kullanıldı
- ✅ 2 farklı rol: Student/Teacher
- ✅ 4 tablo: Users, Posts, Comments, Categories
- ✅ Kullanıcı kayıt/giriş/yetkilendirme
- ✅ CRUD işlemleri frontend'den yönetiliyor
- ✅ Rollere göre farklı sayfalar
- ✅ Detaylı rapor (PDF)
- ✅ Kod açıklamaları
- ✅ Veritabanı diyagramı

---

**Hazırlayan**: CENG 307 Öğrencisi  
**Tarih**: Aralık 2024  
**Teslim Tarihi**: 09.01.2026'dan önce
