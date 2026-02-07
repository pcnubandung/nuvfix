// Email Service using Nodemailer
const nodemailer = require('nodemailer');

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  family: 4, // Force IPv4
  auth: {
    user: process.env.EMAIL_USER || 'nuvibes@nukotabandung.or.id',
    pass: process.env.EMAIL_PASSWORD || ''
  },
  tls: {
    rejectUnauthorized: false // Accept self-signed certificates
  }
};

const EMAIL_FROM = process.env.EMAIL_FROM || 'Koperasi NU Vibes <nuvibes@nukotabandung.or.id>';

// Create transporter
let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport(EMAIL_CONFIG);
    console.log('📧 Email transporter created');
    console.log('   Using IPv4 only');
  }
  return transporter;
}

// Verify email configuration
async function verifyEmailConfig() {
  try {
    const transport = getTransporter();
    await transport.verify();
    console.log('✅ Email configuration verified');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
}

// Send email function
async function sendEmail({ to, subject, text, html }) {
  try {
    if (!process.env.EMAIL_PASSWORD) {
      console.warn('⚠️ EMAIL_PASSWORD not set, skipping email send');
      return { success: false, message: 'Email not configured' };
    }

    const transport = getTransporter();
    
    const mailOptions = {
      from: EMAIL_FROM,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br>')
    };

    console.log(`📧 Sending email to: ${to}`);
    console.log(`   Subject: ${subject}`);
    
    const info = await transport.sendMail(mailOptions);
    
    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    return { success: false, error: error.message };
  }
}

// ===== EMAIL TEMPLATES =====

// 1. Welcome Email - Pendaftaran Berhasil
async function sendWelcomeEmail(anggota) {
  const subject = 'Selamat Datang di Koperasi NU Vibes! 🎉';
  
  const text = `
Halo ${anggota.nama_lengkap},

Terima kasih telah mendaftar sebagai anggota Koperasi NU Vibes!

Informasi Pendaftaran:
- Nomor Anggota: ${anggota.nomor_anggota}
- Nama Lengkap: ${anggota.nama_lengkap}
- Email: ${anggota.email}
- Status: Menunggu Aktivasi

Akun Anda akan segera diaktifkan oleh admin. Anda akan menerima notifikasi email saat akun sudah aktif dan bisa digunakan untuk login ke portal member.

Portal Member: ${process.env.APP_URL || 'https://your-app.railway.app'}/member-login.html

Jika ada pertanyaan, silakan hubungi kami.

Salam hangat,
Tim Koperasi NU Vibes
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; border-left: 4px solid #2E7D32; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    .button { display: inline-block; padding: 12px 30px; background: #2E7D32; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Selamat Datang!</h1>
      <p>Terima kasih telah bergabung dengan Koperasi NU Vibes</p>
    </div>
    <div class="content">
      <p>Halo <strong>${anggota.nama_lengkap}</strong>,</p>
      
      <p>Terima kasih telah mendaftar sebagai anggota Koperasi NU Vibes!</p>
      
      <div class="info-box">
        <h3>📋 Informasi Pendaftaran</h3>
        <p><strong>Nomor Anggota:</strong> ${anggota.nomor_anggota}</p>
        <p><strong>Nama Lengkap:</strong> ${anggota.nama_lengkap}</p>
        <p><strong>Email:</strong> ${anggota.email}</p>
        <p><strong>Status:</strong> ⏳ Menunggu Aktivasi</p>
      </div>
      
      <p>Akun Anda akan segera diaktifkan oleh admin. Anda akan menerima notifikasi email saat akun sudah aktif dan bisa digunakan untuk login ke portal member.</p>
      
      <p>Jika ada pertanyaan, silakan hubungi kami.</p>
      
      <p>Salam hangat,<br><strong>Tim Koperasi NU Vibes</strong></p>
    </div>
    <div class="footer">
      <p>© 2025 Koperasi NU Vibes. All rights reserved.</p>
      <p>Email ini dikirim otomatis, mohon tidak membalas email ini.</p>
    </div>
  </div>
</body>
</html>
`;

  return await sendEmail({
    to: anggota.email,
    subject,
    text,
    html
  });
}

// 2. Account Activated Email
async function sendAccountActivatedEmail(anggota) {
  const subject = 'Akun Anda Sudah Aktif! ✅';
  
  const portalUrl = `${process.env.APP_URL || 'https://your-app.railway.app'}/member-login.html`;
  
  const text = `
Halo ${anggota.nama_lengkap},

Kabar baik! Akun Anda sudah diaktifkan! 🎉

Informasi Login:
- Username: ${anggota.username || anggota.email}
- Portal Member: ${portalUrl}

Anda sekarang bisa login dan mengakses portal member untuk:
- Melihat saldo simpanan
- Melihat riwayat transaksi
- Melihat partisipasi
- Update profil
- Dan masih banyak lagi

Silakan login menggunakan username dan password yang telah Anda buat saat pendaftaran.

Salam hangat,
Tim Koperasi NU Vibes
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; border-left: 4px solid #2E7D32; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    .button { display: inline-block; padding: 12px 30px; background: #2E7D32; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .features { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .features ul { list-style: none; padding: 0; }
    .features li { padding: 8px 0; }
    .features li:before { content: "✓ "; color: #2E7D32; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Akun Aktif!</h1>
      <p>Selamat! Akun Anda sudah diaktifkan</p>
    </div>
    <div class="content">
      <p>Halo <strong>${anggota.nama_lengkap}</strong>,</p>
      
      <p>Kabar baik! Akun Anda sudah diaktifkan! 🎉</p>
      
      <div class="info-box">
        <h3>🔐 Informasi Login</h3>
        <p><strong>Username:</strong> ${anggota.username || anggota.email}</p>
        <p><strong>Portal Member:</strong> <a href="${portalUrl}">${portalUrl}</a></p>
      </div>
      
      <div class="features">
        <h3>📱 Fitur Portal Member</h3>
        <ul>
          <li>Melihat saldo simpanan</li>
          <li>Melihat riwayat transaksi</li>
          <li>Melihat partisipasi</li>
          <li>Update profil</li>
          <li>Ganti password</li>
          <li>Dan masih banyak lagi</li>
        </ul>
      </div>
      
      <center>
        <a href="${portalUrl}" class="button">Login Sekarang</a>
      </center>
      
      <p>Silakan login menggunakan username dan password yang telah Anda buat saat pendaftaran.</p>
      
      <p>Salam hangat,<br><strong>Tim Koperasi NU Vibes</strong></p>
    </div>
    <div class="footer">
      <p>© 2025 Koperasi NU Vibes. All rights reserved.</p>
      <p>Email ini dikirim otomatis, mohon tidak membalas email ini.</p>
    </div>
  </div>
</body>
</html>
`;

  return await sendEmail({
    to: anggota.email,
    subject,
    text,
    html
  });
}

// 3. Payment Confirmation Email
async function sendPaymentConfirmationEmail(anggota, simpanan) {
  const subject = 'Konfirmasi Pembayaran Simpanan';
  
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const text = `
Halo ${anggota.nama_lengkap},

Pembayaran simpanan Anda telah diterima dan dicatat dalam sistem.

Detail Transaksi:
- Jenis Simpanan: ${simpanan.jenis_simpanan}
- Jumlah: ${formatRupiah(simpanan.jumlah)}
- Tanggal: ${simpanan.tanggal_transaksi}
- Keterangan: ${simpanan.keterangan || '-'}

Saldo Simpanan Anda Saat Ini:
- Total Saldo: ${formatRupiah(simpanan.saldo_total || simpanan.jumlah)}

Terima kasih atas partisipasi Anda dalam Koperasi NU Vibes!

Salam hangat,
Tim Koperasi NU Vibes
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; border-left: 4px solid #2E7D32; margin: 20px 0; }
    .amount { font-size: 32px; color: #2E7D32; font-weight: bold; text-align: center; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Pembayaran Diterima</h1>
      <p>Konfirmasi Pembayaran Simpanan</p>
    </div>
    <div class="content">
      <p>Halo <strong>${anggota.nama_lengkap}</strong>,</p>
      
      <p>Pembayaran simpanan Anda telah diterima dan dicatat dalam sistem.</p>
      
      <div class="amount">
        ${formatRupiah(simpanan.jumlah)}
      </div>
      
      <div class="info-box">
        <h3>📋 Detail Transaksi</h3>
        <p><strong>Jenis Simpanan:</strong> ${simpanan.jenis_simpanan}</p>
        <p><strong>Jumlah:</strong> ${formatRupiah(simpanan.jumlah)}</p>
        <p><strong>Tanggal:</strong> ${simpanan.tanggal_transaksi}</p>
        <p><strong>Keterangan:</strong> ${simpanan.keterangan || '-'}</p>
      </div>
      
      <div class="info-box">
        <h3>💰 Saldo Simpanan Anda</h3>
        <p><strong>Total Saldo:</strong> ${formatRupiah(simpanan.saldo_total || simpanan.jumlah)}</p>
      </div>
      
      <p>Terima kasih atas partisipasi Anda dalam Koperasi NU Vibes!</p>
      
      <p>Salam hangat,<br><strong>Tim Koperasi NU Vibes</strong></p>
    </div>
    <div class="footer">
      <p>© 2025 Koperasi NU Vibes. All rights reserved.</p>
      <p>Email ini dikirim otomatis, mohon tidak membalas email ini.</p>
    </div>
  </div>
</body>
</html>
`;

  return await sendEmail({
    to: anggota.email,
    subject,
    text,
    html
  });
}

// 4. Withdrawal Confirmation Email
async function sendWithdrawalConfirmationEmail(anggota, simpanan) {
  const subject = 'Konfirmasi Penarikan Simpanan';
  
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const text = `
Halo ${anggota.nama_lengkap},

Penarikan simpanan Anda telah diproses.

Detail Transaksi:
- Jenis Simpanan: ${simpanan.jenis_simpanan}
- Jumlah Penarikan: ${formatRupiah(Math.abs(simpanan.jumlah))}
- Tanggal: ${simpanan.tanggal_transaksi}
- Keterangan: ${simpanan.keterangan || '-'}

Saldo Simpanan Anda Saat Ini:
- Total Saldo: ${formatRupiah(simpanan.saldo_total || 0)}

Terima kasih.

Salam hangat,
Tim Koperasi NU Vibes
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; border-left: 4px solid #2E7D32; margin: 20px 0; }
    .amount { font-size: 32px; color: #d32f2f; font-weight: bold; text-align: center; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💸 Penarikan Diproses</h1>
      <p>Konfirmasi Penarikan Simpanan</p>
    </div>
    <div class="content">
      <p>Halo <strong>${anggota.nama_lengkap}</strong>,</p>
      
      <p>Penarikan simpanan Anda telah diproses.</p>
      
      <div class="amount">
        - ${formatRupiah(Math.abs(simpanan.jumlah))}
      </div>
      
      <div class="info-box">
        <h3>📋 Detail Transaksi</h3>
        <p><strong>Jenis Simpanan:</strong> ${simpanan.jenis_simpanan}</p>
        <p><strong>Jumlah Penarikan:</strong> ${formatRupiah(Math.abs(simpanan.jumlah))}</p>
        <p><strong>Tanggal:</strong> ${simpanan.tanggal_transaksi}</p>
        <p><strong>Keterangan:</strong> ${simpanan.keterangan || '-'}</p>
      </div>
      
      <div class="info-box">
        <h3>💰 Saldo Simpanan Anda</h3>
        <p><strong>Total Saldo:</strong> ${formatRupiah(simpanan.saldo_total || 0)}</p>
      </div>
      
      <p>Terima kasih.</p>
      
      <p>Salam hangat,<br><strong>Tim Koperasi NU Vibes</strong></p>
    </div>
    <div class="footer">
      <p>© 2025 Koperasi NU Vibes. All rights reserved.</p>
      <p>Email ini dikirim otomatis, mohon tidak membalas email ini.</p>
    </div>
  </div>
</body>
</html>
`;

  return await sendEmail({
    to: anggota.email,
    subject,
    text,
    html
  });
}

// 5. Password Changed Email
async function sendPasswordChangedEmail(anggota) {
  const subject = 'Password Anda Telah Diubah';
  
  const text = `
Halo ${anggota.nama_lengkap},

Password akun Anda telah berhasil diubah.

Jika Anda tidak melakukan perubahan ini, segera hubungi admin untuk keamanan akun Anda.

Tanggal Perubahan: ${new Date().toLocaleString('id-ID')}

Salam hangat,
Tim Koperasi NU Vibes
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .warning-box { background: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Password Diubah</h1>
      <p>Notifikasi Keamanan Akun</p>
    </div>
    <div class="content">
      <p>Halo <strong>${anggota.nama_lengkap}</strong>,</p>
      
      <p>Password akun Anda telah berhasil diubah.</p>
      
      <div class="warning-box">
        <h3>⚠️ Penting!</h3>
        <p>Jika Anda <strong>tidak melakukan</strong> perubahan ini, segera hubungi admin untuk keamanan akun Anda.</p>
        <p><strong>Tanggal Perubahan:</strong> ${new Date().toLocaleString('id-ID')}</p>
      </div>
      
      <p>Salam hangat,<br><strong>Tim Koperasi NU Vibes</strong></p>
    </div>
    <div class="footer">
      <p>© 2025 Koperasi NU Vibes. All rights reserved.</p>
      <p>Email ini dikirim otomatis, mohon tidak membalas email ini.</p>
    </div>
  </div>
</body>
</html>
`;

  return await sendEmail({
    to: anggota.email,
    subject,
    text,
    html
  });
}

module.exports = {
  sendEmail,
  verifyEmailConfig,
  sendWelcomeEmail,
  sendAccountActivatedEmail,
  sendPaymentConfirmationEmail,
  sendWithdrawalConfirmationEmail,
  sendPasswordChangedEmail
};
