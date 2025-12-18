# Blog Frontend - React

Basit Blog Yönetim Sistemi için Frontend Uygulaması

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npm start
```

Frontend http://localhost:3000 adresinde çalışacak.

## Özellikler

### Öğrenci (Okuyucu) Kullanıcıları:
- Blog yazılarını görüntüleme
- Yazı detaylarını okuma
- Yorum yapma
- Yazıları beğenme
- Kategoriye göre filtreleme

### Öğretmen (Yazar) Kullanıcıları:
- Yukarıdaki tüm özellikler
- Yeni blog yazısı oluşturma
- Kendi yazılarını düzenleme
- Kendi yazılarını silme
- Kategori yönetimi
- Tüm yorumları yönetme

## Component Yapısı

- **App.js** - Ana uygulama ve routing
- **Navbar.js** - Navigasyon çubuğu
- **Login.js** - Giriş sayfası
- **Register.js** - Kayıt sayfası
- **PostList.js** - Yazı listesi
- **PostDetail.js** - Yazı detayı ve yorumlar
- **CreatePost.js** - Yeni yazı oluşturma
- **EditPost.js** - Yazı düzenleme

## Teknolojiler

- React 18 - UI framework
- React Router - Sayfa yönlendirme
- Axios - HTTP istekleri
- CSS3 - Stil
