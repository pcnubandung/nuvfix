# 📧 Sistem Notifikasi Email & WhatsApp

## Overview

Sistem notifikasi otomatis untuk member saat ada aktivitas penting di akun mereka.

## 🎯 Notifikasi yang Akan Dikirim

### 1. Notifikasi Member
| Event | Email | WhatsApp | Deskripsi |
|-------|-------|----------|-----------|
| **Pendaftaran Berhasil** | ✅ | ✅ | Selamat datang, info akun |
| **Akun Diaktifkan** | ✅ | ✅ | Akun sudah aktif, bisa login |
| **Pembayaran Simpanan** | ✅ | ✅ | Konfirmasi pembayaran, saldo |
| **Penarikan Simpanan** | ✅ | ✅ | Konfirmasi penarikan |
| **Partisipasi Dicatat** | ✅ | ✅ | Konfirmasi partisipasi |
| **SHU Dibagikan** | ✅ | ✅ | Info pembagian SHU |
| **Password Diubah** | ✅ | ❌ | Keamanan akun |
| **Profil Diupdate** | ✅ | ❌ | Konfirmasi perubahan data |

### 2. Notifikasi Admin
| Event | Email | WhatsApp | Deskripsi |
|-------|-------|----------|-----------|
| **Pendaftaran Baru** | ✅ | ✅ | Ada anggota baru mendaftar |
| **Approval Pending** | ✅ | ❌ | Ada data perlu approval |

## 🔧 Teknologi yang Digunakan

### Email
**Pilihan 1: Nodemailer + Gmail (Recommended - Gratis)**
- ✅ Gratis untuk < 500 email/hari
- ✅ Mudah setup
- ✅ Reliable
- ❌ Perlu App Password Gmail

**Pilihan 2: SendGrid (Gratis 100 email/hari)**
- ✅ Professional
- ✅ Email tracking
- ❌ Perlu daftar

**Pilihan 3: Resend (Gratis 3000 email/bulan)**
- ✅ Modern API
- ✅ Good deliverability
- ❌ Perlu daftar

### WhatsApp
**Pilihan 1: Fonnte (Recommended - Berbayar)**
- ✅ WhatsApp Official API
- ✅ Reliable
- ✅ Support Indonesia
- 💰 Rp 75.000/bulan (unlimited)

**Pilihan 2: Wablas**
- ✅ WhatsApp API
- ✅ Support Indonesia
- 💰 Rp 50.000/bulan

**Pilihan 3: WhatsApp Business API (Official)**
- ✅ Official
- ✅ Very reliable
- 💰 Mahal (untuk enterprise)

## 📋 Implementasi

### Phase 1: Email Notifications (Gratis)
1. Setup Nodemailer dengan Gmail
2. Buat email templates
3. Implementasi notifikasi:
   - Pendaftaran berhasil
   - Pembayaran simpanan
   - Penarikan simpanan
   - Password diubah

### Phase 2: WhatsApp Notifications (Berbayar)
1. Setup Fonnte API
2. Buat WhatsApp templates
3. Implementasi notifikasi:
   - Pendaftaran berhasil
   - Pembayaran simpanan
   - Penarikan simpanan

### Phase 3: Advanced Features
1. Notifikasi preferences (member bisa pilih mau notif apa)
2. Email templates yang lebih cantik (HTML)
3. Notification history/log
4. Retry mechanism untuk failed notifications

## 🚀 Quick Start - Email dengan Gmail (Gratis)

### Step 1: Setup Gmail App Password
1. Buka Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password untuk "Mail"
4. Copy password yang digenerate

### Step 2: Install Dependencies
```bash
npm install nodemailer
```

### Step 3: Environment Variables
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Koperasi NU Vibes <your-email@gmail.com>
```

### Step 4: Implementasi
Saya akan buatkan:
- `helpers/email-service.js` - Email service
- `helpers/whatsapp-service.js` - WhatsApp service (optional)
- `helpers/notification-service.js` - Unified notification service

## 📧 Email Templates

### 1. Welcome Email (Pendaftaran)
```
Subject: Selamat Datang di Koperasi NU Vibes! 🎉

Halo [Nama],

Terima kasih telah mendaftar sebagai anggota Koperasi NU Vibes!

Nomor Anggota: [Nomor]
Status: Menunggu Aktivasi

Akun Anda akan segera diaktifkan oleh admin. Anda akan menerima 
notifikasi saat akun sudah aktif.

Salam,
Koperasi NU Vibes
```

### 2. Account Activated
```
Subject: Akun Anda Sudah Aktif! ✅

Halo [Nama],

Akun Anda sudah diaktifkan!

Username: [Username/Email]
Portal Member: [URL]

Anda sekarang bisa login dan mengakses portal member.

Salam,
Koperasi NU Vibes
```

### 3. Payment Confirmation
```
Subject: Konfirmasi Pembayaran Simpanan

Halo [Nama],

Pembayaran simpanan Anda telah diterima:

Jenis: [Jenis Simpanan]
Jumlah: Rp [Jumlah]
Tanggal: [Tanggal]
Saldo: Rp [Saldo Total]

Terima kasih atas partisipasi Anda!

Salam,
Koperasi NU Vibes
```

## 📱 WhatsApp Templates

### 1. Welcome Message
```
*Selamat Datang di Koperasi NU Vibes!* 🎉

Halo *[Nama]*,

Terima kasih telah mendaftar!

📋 Nomor Anggota: *[Nomor]*
⏳ Status: Menunggu Aktivasi

Anda akan menerima notifikasi saat akun sudah aktif.

_Koperasi NU Vibes_
```

### 2. Payment Confirmation
```
*Konfirmasi Pembayaran* ✅

Halo *[Nama]*,

Pembayaran simpanan diterima:

💰 Jumlah: *Rp [Jumlah]*
📅 Tanggal: [Tanggal]
💳 Saldo: *Rp [Saldo]*

Terima kasih!

_Koperasi NU Vibes_
```

## 💰 Estimasi Biaya

### Email (Gmail)
- **Gratis** untuk < 500 email/hari
- Cukup untuk koperasi kecil-menengah

### WhatsApp (Fonnte)
- **Rp 75.000/bulan** unlimited pesan
- Atau **Rp 250.000** untuk 3 bulan
- ROI: Meningkatkan engagement member

### Total
- **Minimal: Rp 0** (email only)
- **Recommended: Rp 75.000/bulan** (email + WhatsApp)

## 🎯 Prioritas Implementasi

### Must Have (Phase 1 - Gratis)
1. ✅ Email pendaftaran
2. ✅ Email pembayaran simpanan
3. ✅ Email penarikan simpanan

### Nice to Have (Phase 2 - Berbayar)
1. ⭐ WhatsApp pendaftaran
2. ⭐ WhatsApp pembayaran
3. ⭐ WhatsApp penarikan

### Future Enhancement (Phase 3)
1. 🚀 Notification preferences
2. 🚀 HTML email templates
3. 🚀 Notification history
4. 🚀 Scheduled notifications (reminder)

## 🔐 Security & Privacy

1. **Email/Phone Privacy**
   - Hanya kirim ke member yang bersangkutan
   - Tidak share data ke pihak ketiga

2. **Opt-out Option**
   - Member bisa disable notifikasi
   - Simpan preference di database

3. **Rate Limiting**
   - Prevent spam
   - Max 10 notifikasi/member/hari

## 📊 Monitoring

1. **Notification Log**
   - Track semua notifikasi yang dikirim
   - Status: sent, failed, pending

2. **Delivery Rate**
   - Monitor success rate
   - Alert jika banyak yang gagal

3. **Member Engagement**
   - Track open rate (email)
   - Track read rate (WhatsApp)

## ❓ FAQ

### Q: Apakah gratis?
A: Email dengan Gmail gratis. WhatsApp berbayar mulai Rp 75rb/bulan.

### Q: Berapa lama implementasi?
A: 
- Email only: 2-3 jam
- Email + WhatsApp: 4-5 jam

### Q: Apakah bisa custom template?
A: Ya, semua template bisa dicustom sesuai kebutuhan.

### Q: Bagaimana jika email/WA member tidak valid?
A: Sistem akan log error dan skip notifikasi tersebut.

## 🚀 Next Steps

Pilih salah satu:

### Opsi 1: Email Only (Gratis)
Saya implementasikan email notifications dengan Gmail.
- Setup time: 2-3 jam
- Cost: Gratis

### Opsi 2: Email + WhatsApp (Recommended)
Saya implementasikan email + WhatsApp notifications.
- Setup time: 4-5 jam  
- Cost: Rp 75.000/bulan (Fonnte)

### Opsi 3: Email + WhatsApp + Advanced
Full implementation dengan preferences, history, dll.
- Setup time: 1-2 hari
- Cost: Rp 75.000/bulan + development time

---

**Rekomendasi:** Mulai dengan **Opsi 1 (Email Only)** dulu untuk test. Jika berhasil dan member suka, upgrade ke **Opsi 2** dengan WhatsApp.

Mau saya implementasikan yang mana?
