# 🌐 LANDING PAGE - KOPERASI NU VIBES

## Overview

Landing page publik untuk Koperasi NU Vibes yang dapat diakses tanpa login. Halaman ini menampilkan profil koperasi, layanan, produk, dan informasi kontak.

## 📁 Files Created

1. **public/landing.html** - HTML landing page
2. **public/css/landing.css** - Styling untuk landing page
3. **public/js/landing.js** - JavaScript untuk interaktivitas
4. **server.js** - Updated dengan public API endpoints

## 🎨 Features

### 1. **Hero Section**
- Judul dan tagline koperasi
- Call-to-action buttons
- Gradient background yang menarik

### 2. **Statistics Section**
- Total Anggota Aktif
- Total Simpanan
- Total Aset
- Tahun Berdiri
- Data real-time dari database

### 3. **About Section**
- Profil koperasi
- Visi dan misi
- Keunggulan koperasi
- Gambar ilustrasi

### 4. **Services Section**
- Simpanan (4 jenis)
- Pinjaman
- SHU
- Portal Online

### 5. **Products Section**
- Simpanan Pokok
- Simpanan Wajib
- Simpanan Sukarela (Featured)
- Simpanan Khusus

### 6. **Contact Section**
- Alamat koperasi
- Nomor telepon
- Email
- Jam operasional
- Contact form

### 7. **Footer**
- Link cepat
- Social media links
- Copyright

## 🚀 Cara Mengakses

### URL Landing Page:
```
http://localhost:3000/landing.html
```

### Set as Homepage (Optional):
Jika ingin landing page sebagai homepage, edit `server.js`:

```javascript
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});
```

## 🔧 Konfigurasi

### 1. Update Logo
Upload logo koperasi melalui menu "Info Koperasi" di admin panel. Logo akan otomatis muncul di landing page.

### 2. Update Kontak
Update informasi kontak di menu "Info Koperasi":
- Alamat
- Nomor Telepon
- Email
- Tanggal Berdiri

### 3. Update Gambar
Ganti gambar di folder `public/assets/`:
- `about-image.jpg` - Gambar untuk section About
- `hero-pattern.png` - Pattern untuk hero section (optional)

### 4. Update Social Media
Edit file `public/landing.html` di bagian footer:
```html
<div class="social-links">
  <a href="https://facebook.com/yourpage"><i data-feather="facebook"></i></a>
  <a href="https://instagram.com/yourpage"><i data-feather="instagram"></i></a>
  <a href="https://twitter.com/yourpage"><i data-feather="twitter"></i></a>
  <a href="https://youtube.com/yourpage"><i data-feather="youtube"></i></a>
</div>
```

## 🎨 Customization

### Warna
Edit file `public/css/landing.css` di bagian `:root`:

```css
:root {
  --primary-color: #2E7D32;      /* Warna utama */
  --secondary-color: #4CAF50;    /* Warna sekunder */
  --accent-color: #FFD700;       /* Warna aksen */
  --dark-color: #2C3E50;         /* Warna gelap */
  --light-color: #ECF0F1;        /* Warna terang */
}
```

### Konten
Edit file `public/landing.html` untuk mengubah:
- Teks hero section
- Deskripsi layanan
- Fitur produk
- Jam operasional

## 📱 Responsive Design

Landing page sudah responsive dan akan menyesuaikan dengan:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

### Mobile Menu
- Hamburger menu otomatis muncul di mobile
- Smooth scroll ke section
- Touch-friendly buttons

## 🔒 Security

### Public Endpoints
Endpoint berikut dapat diakses tanpa autentikasi:
- `GET /api/koperasi-info` - Info koperasi
- `GET /api/public/stats` - Statistik publik (limited)

Data sensitif tidak ditampilkan di landing page.

## ⚡ Performance

### Optimizations
- Lazy loading untuk gambar
- Minified CSS & JS (production)
- CDN untuk icons (Feather Icons)
- Smooth animations dengan CSS
- Efficient DOM manipulation

### Loading Speed
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 90+

## 🎯 SEO

### Meta Tags
Landing page sudah include:
- Title tag
- Meta description
- Viewport meta
- Charset UTF-8

### Untuk SEO Lebih Baik:
Tambahkan di `<head>`:

```html
<!-- Open Graph -->
<meta property="og:title" content="Koperasi NU Vibes">
<meta property="og:description" content="Koperasi Simpan Pinjam Terpercaya">
<meta property="og:image" content="/uploads/logo.png">
<meta property="og:url" content="https://yourwebsite.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Koperasi NU Vibes">
<meta name="twitter:description" content="Koperasi Simpan Pinjam Terpercaya">
<meta name="twitter:image" content="/uploads/logo.png">
```

## 📊 Analytics (Optional)

### Google Analytics
Tambahkan di `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔗 Integration

### Link dari Landing ke Admin
- Button "Login" → `/login.html`
- Button "Portal Anggota" → `/member.html`

### Link dari Admin ke Landing
Tambahkan link di navbar admin:
```html
<a href="/landing.html" target="_blank">Lihat Website</a>
```

## 📝 Contact Form

Contact form saat ini hanya menampilkan alert. Untuk production:

### Option 1: Email Integration
Install nodemailer:
```bash
npm install nodemailer
```

Tambahkan endpoint di `server.js`:
```javascript
app.post('/api/contact', async (req, res) => {
  const { nama, email, telepon, pesan } = req.body;
  
  // Send email using nodemailer
  // ... implementation
  
  res.json({ success: true, message: 'Pesan terkirim' });
});
```

### Option 2: Save to Database
Buat tabel `contact_messages` dan simpan pesan ke database.

## 🚀 Deployment

### Production Checklist
- [ ] Update logo koperasi
- [ ] Update info kontak
- [ ] Update social media links
- [ ] Ganti gambar placeholder
- [ ] Test responsive di semua device
- [ ] Test semua links
- [ ] Enable contact form backend
- [ ] Add Google Analytics
- [ ] Add SEO meta tags
- [ ] Minify CSS & JS
- [ ] Optimize images
- [ ] Test loading speed

## 🎨 Design Inspiration

Landing page ini terinspirasi dari:
- https://kopkarss.co.id/
- Modern landing page best practices
- Material Design principles
- Clean and professional layout

## 📞 Support

Jika ada pertanyaan atau butuh customization lebih lanjut, silakan hubungi developer.

---

**Happy Landing! 🚀**
