# 📧 Email Notification Setup Guide

## ✅ Yang Sudah Diimplementasikan

### 1. Email Service (`helpers/email-service.js`)
- ✅ Nodemailer configuration
- ✅ Email templates (HTML + Plain text)
- ✅ 5 jenis notifikasi:
  1. Welcome Email (Pendaftaran)
  2. Account Activated
  3. Payment Confirmation
  4. Withdrawal Confirmation
  5. Password Changed

### 2. Integrasi ke Routes
- ✅ `routes-anggota.js` - Welcome & Activation email
- ✅ `routes-simpanan.js` - Payment & Withdrawal email (helper function ready)

### 3. Dependencies
- ✅ `nodemailer` sudah terinstall

## 🚀 Cara Setup

### Step 1: Dapatkan Informasi SMTP Email

Hubungi admin email `nukotabandung.or.id` untuk mendapatkan:
- SMTP Host (biasanya: `mail.nukotabandung.or.id` atau `smtp.nukotabandung.or.id`)
- SMTP Port (biasanya: `587` untuk TLS atau `465` untuk SSL)
- Username: `nuvibes@nukotabandung.or.id`
- Password: (password email)

### Step 2: Set Environment Variables di Railway

Login ke Railway Dashboard → Project → Variables, tambahkan:

```env
# Email Configuration
EMAIL_HOST=mail.nukotabandung.or.id
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=nuvibes@nukotabandung.or.id
EMAIL_PASSWORD=your-actual-password-here
EMAIL_FROM=Koperasi NU Vibes <nuvibes@nukotabandung.or.id>

# Enable Notifications
ENABLE_EMAIL_NOTIFICATIONS=true

# App URL (untuk link di email)
APP_URL=https://your-app.railway.app
```

**Catatan Penting:**
- `EMAIL_SECURE=false` untuk port 587 (TLS/STARTTLS)
- `EMAIL_SECURE=true` untuk port 465 (SSL)
- Ganti `your-actual-password-here` dengan password email yang sebenarnya
- Ganti `your-app.railway.app` dengan URL Railway app Anda

### Step 3: Test Email Configuration

Setelah deploy, cek Railway logs untuk melihat:

```
📧 Email transporter created
✅ Email configuration verified
```

Jika ada error:
```
❌ Email configuration error: [error message]
```

Berarti ada masalah dengan konfigurasi SMTP.

### Step 4: Test Notifikasi

#### Test 1: Welcome Email
1. Daftar anggota baru dengan email valid
2. Cek Railway logs:
   ```
   📧 Sending welcome email to: member@example.com
   ✅ Email sent: <message-id>
   ```
3. Cek inbox email member

#### Test 2: Account Activated Email
1. Edit anggota, ubah status dari "pending" ke "aktif"
2. Cek Railway logs untuk konfirmasi email terkirim
3. Cek inbox email member

#### Test 3: Payment Confirmation
1. Input pembayaran simpanan untuk anggota
2. Cek Railway logs
3. Cek inbox email member

## 📧 Email Templates

### 1. Welcome Email
**Subject:** Selamat Datang di Koperasi NU Vibes! 🎉

**Dikirim saat:**
- Anggota baru mendaftar (via form registrasi atau admin)

**Isi:**
- Ucapan selamat datang
- Nomor anggota
- Status: Menunggu aktivasi
- Info bahwa akan ada notifikasi saat akun aktif

### 2. Account Activated
**Subject:** Akun Anda Sudah Aktif! ✅

**Dikirim saat:**
- Admin mengubah status anggota dari non-aktif ke aktif

**Isi:**
- Informasi login (username)
- Link portal member
- Fitur-fitur yang bisa diakses

### 3. Payment Confirmation
**Subject:** Konfirmasi Pembayaran Simpanan

**Dikirim saat:**
- Admin input pembayaran simpanan (pokok/wajib/khusus/sukarela)
- Member submit pembayaran dan diapprove

**Isi:**
- Jenis simpanan
- Jumlah pembayaran
- Tanggal transaksi
- Total saldo simpanan

### 4. Withdrawal Confirmation
**Subject:** Konfirmasi Penarikan Simpanan

**Dikirim saat:**
- Admin input penarikan simpanan (jumlah negatif)

**Isi:**
- Jenis simpanan
- Jumlah penarikan
- Tanggal transaksi
- Sisa saldo simpanan

### 5. Password Changed
**Subject:** Password Anda Telah Diubah

**Dikirim saat:**
- Member ganti password via portal member

**Isi:**
- Notifikasi password berhasil diubah
- Warning jika bukan member yang melakukan
- Tanggal perubahan

## 🔧 Troubleshooting

### Email tidak terkirim

**1. Cek Environment Variables**
```bash
# Di Railway logs, cari:
🔧 Server Configuration:
  - EMAIL_HOST: mail.nukotabandung.or.id
  - EMAIL_USER: nuvibes@nukotabandung.or.id
```

Jika tidak muncul, berarti env var belum di-set.

**2. Cek SMTP Configuration**
```bash
# Di Railway logs, cari:
❌ Email configuration error: ...
```

Kemungkinan masalah:
- Host salah
- Port salah
- Username/password salah
- Firewall blocking

**3. Test Manual SMTP**

Buat file `test-email.js`:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.nukotabandung.or.id',
  port: 587,
  secure: false,
  auth: {
    user: 'nuvibes@nukotabandung.or.id',
    pass: 'your-password'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Error:', error);
  } else {
    console.log('✅ Server is ready to send emails');
  }
});
```

Run: `node test-email.js`

### Email masuk spam

**Solusi:**
1. Setup SPF record di DNS nukotabandung.or.id
2. Setup DKIM
3. Setup DMARC
4. Gunakan email yang sudah terverifikasi

Hubungi admin domain untuk setup DNS records.

### Email lambat terkirim

**Penyebab:**
- SMTP server lambat
- Network latency
- Rate limiting

**Solusi:**
- Gunakan queue system (future enhancement)
- Increase timeout di nodemailer config

## 📊 Monitoring

### Cek Email Logs

Di Railway logs, filter dengan:
- `📧` - Email being sent
- `✅ Email sent` - Success
- `❌ Failed to send` - Error

### Email Statistics

Untuk tracking lebih detail, bisa tambahkan:
1. Email log table di database
2. Track delivery status
3. Track open rate (future)

## 🔐 Security

### Best Practices:
1. ✅ Jangan commit password ke Git
2. ✅ Gunakan environment variables
3. ✅ Gunakan TLS/SSL untuk SMTP
4. ✅ Validate email addresses
5. ✅ Rate limiting (prevent spam)

### Password Email:
- Simpan di Railway environment variables
- Jangan share ke orang lain
- Ganti berkala

## 📝 Customization

### Ubah Email Template

Edit file `helpers/email-service.js`:

```javascript
// Contoh: Ubah subject
const subject = 'Selamat Datang di Koperasi NU Vibes! 🎉';

// Contoh: Ubah isi email
const text = `
Halo ${anggota.nama_lengkap},

[Isi email Anda di sini]
`;

// Contoh: Ubah HTML template
const html = `
<!DOCTYPE html>
<html>
...
</html>
`;
```

### Tambah Notifikasi Baru

1. Buat function di `helpers/email-service.js`:
```javascript
async function sendNewNotification(anggota, data) {
  const subject = 'Subject Email';
  const text = `...`;
  const html = `...`;
  
  return await sendEmail({ to: anggota.email, subject, text, html });
}
```

2. Export function:
```javascript
module.exports = {
  ...
  sendNewNotification
};
```

3. Gunakan di route:
```javascript
const emailService = require('../helpers/email-service');

// Di endpoint
if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
  await emailService.sendNewNotification(anggota, data);
}
```

## 🎯 Next Steps

### Phase 1 (Current):
- ✅ Email service setup
- ✅ Basic templates
- ✅ Integration ke routes utama

### Phase 2 (Future):
- [ ] Notifikasi SHU dibagikan
- [ ] Notifikasi partisipasi dicatat
- [ ] Notifikasi reminder (iuran jatuh tempo)
- [ ] Email preferences (member bisa pilih notif apa)

### Phase 3 (Advanced):
- [ ] Email queue system
- [ ] Email templates yang lebih cantik
- [ ] Email tracking (open rate, click rate)
- [ ] Notification history di database

## 📞 Support

Jika ada masalah:
1. Cek Railway logs
2. Cek environment variables
3. Test SMTP connection manual
4. Hubungi admin email nukotabandung.or.id

## ✅ Checklist Setup

- [ ] Dapatkan info SMTP dari admin email
- [ ] Set environment variables di Railway:
  - [ ] EMAIL_HOST
  - [ ] EMAIL_PORT
  - [ ] EMAIL_SECURE
  - [ ] EMAIL_USER
  - [ ] EMAIL_PASSWORD
  - [ ] EMAIL_FROM
  - [ ] ENABLE_EMAIL_NOTIFICATIONS=true
  - [ ] APP_URL
- [ ] Deploy ke Railway
- [ ] Cek logs untuk verifikasi SMTP
- [ ] Test welcome email (daftar anggota baru)
- [ ] Test activation email (aktifkan anggota)
- [ ] Test payment email (input pembayaran)
- [ ] Verify email masuk ke inbox (bukan spam)

---

**Status:** ✅ Ready to deploy
**Perlu:** SMTP credentials dari admin email nukotabandung.or.id
