// Test Email Configuration
// Run: node test-email-config.js

const nodemailer = require('nodemailer');

console.log('🧪 Testing Email Configuration...\n');

// Configuration from environment or hardcoded for testing
const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: process.env.EMAIL_SECURE === 'true' || true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER || 'nuvibes@nukotabandung.or.id',
    pass: process.env.EMAIL_PASSWORD || 'Koperasi@nuvibes1'
  }
};

const EMAIL_FROM = process.env.EMAIL_FROM || 'Koperasi NU Vibes <nuvibes@nukotabandung.or.id>';

console.log('📧 Configuration:');
console.log('  Host:', EMAIL_CONFIG.host);
console.log('  Port:', EMAIL_CONFIG.port);
console.log('  Secure:', EMAIL_CONFIG.secure);
console.log('  User:', EMAIL_CONFIG.auth.user);
console.log('  Password:', EMAIL_CONFIG.auth.pass ? '***' + EMAIL_CONFIG.auth.pass.slice(-4) : 'NOT SET');
console.log('  From:', EMAIL_FROM);
console.log('');

// Create transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Test 1: Verify connection
console.log('🔍 Test 1: Verifying SMTP connection...');
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Connection Failed!');
    console.log('   Error:', error.message);
    console.log('');
    console.log('💡 Troubleshooting:');
    
    if (error.message.includes('EAUTH')) {
      console.log('   - Username atau password salah');
      console.log('   - Cek EMAIL_USER dan EMAIL_PASSWORD');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('   - Host atau port salah');
      console.log('   - Cek EMAIL_HOST dan EMAIL_PORT');
    } else if (error.message.includes('ETIMEDOUT')) {
      console.log('   - Firewall blocking atau host tidak bisa diakses');
      console.log('   - Cek koneksi internet');
    } else if (error.message.includes('certificate')) {
      console.log('   - SSL/TLS certificate error');
      console.log('   - Coba ubah EMAIL_SECURE (true/false)');
    }
    
    console.log('');
    console.log('📝 Recommended Settings:');
    console.log('');
    console.log('   For Hostinger (SSL):');
    console.log('   EMAIL_HOST=smtp.hostinger.com');
    console.log('   EMAIL_PORT=465');
    console.log('   EMAIL_SECURE=true');
    console.log('');
    console.log('   For Hostinger (TLS):');
    console.log('   EMAIL_HOST=smtp.hostinger.com');
    console.log('   EMAIL_PORT=587');
    console.log('   EMAIL_SECURE=false');
    
    process.exit(1);
  } else {
    console.log('✅ SMTP Connection Successful!');
    console.log('   Server is ready to send emails');
    console.log('');
    
    // Test 2: Send test email
    sendTestEmail();
  }
});

// Send test email
function sendTestEmail() {
  console.log('📨 Test 2: Sending test email...');
  
  // Change this to your test email
  const TEST_EMAIL = process.env.TEST_EMAIL || 'nuvibes@nukotabandung.or.id';
  
  const mailOptions = {
    from: EMAIL_FROM,
    to: TEST_EMAIL,
    subject: '✅ Test Email - Koperasi NU Vibes',
    text: `
Halo!

Ini adalah test email dari sistem Koperasi NU Vibes.

Jika Anda menerima email ini, berarti konfigurasi email sudah benar! ✅

Informasi:
- Waktu: ${new Date().toLocaleString('id-ID')}
- Host: ${EMAIL_CONFIG.host}
- Port: ${EMAIL_CONFIG.port}
- Secure: ${EMAIL_CONFIG.secure}

Salam,
Tim Koperasi NU Vibes
    `,
    html: `
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Test Email Berhasil!</h1>
      <p>Konfigurasi Email Sudah Benar</p>
    </div>
    <div class="content">
      <p>Halo!</p>
      
      <p>Ini adalah test email dari sistem <strong>Koperasi NU Vibes</strong>.</p>
      
      <p>Jika Anda menerima email ini, berarti konfigurasi email sudah benar! ✅</p>
      
      <div class="info-box">
        <h3>📋 Informasi Konfigurasi</h3>
        <p><strong>Waktu:</strong> ${new Date().toLocaleString('id-ID')}</p>
        <p><strong>Host:</strong> ${EMAIL_CONFIG.host}</p>
        <p><strong>Port:</strong> ${EMAIL_CONFIG.port}</p>
        <p><strong>Secure:</strong> ${EMAIL_CONFIG.secure ? 'Yes (SSL)' : 'No (TLS)'}</p>
      </div>
      
      <p>Sistem notifikasi email siap digunakan!</p>
      
      <p>Salam,<br><strong>Tim Koperasi NU Vibes</strong></p>
    </div>
    <div class="footer">
      <p>© 2025 Koperasi NU Vibes. All rights reserved.</p>
      <p>Email ini dikirim otomatis untuk testing.</p>
    </div>
  </div>
</body>
</html>
    `
  };
  
  console.log('   Sending to:', TEST_EMAIL);
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('❌ Failed to send test email!');
      console.log('   Error:', error.message);
      process.exit(1);
    } else {
      console.log('✅ Test email sent successfully!');
      console.log('   Message ID:', info.messageId);
      console.log('   Response:', info.response);
      console.log('');
      console.log('🎉 Email configuration is working perfectly!');
      console.log('');
      console.log('📬 Check your inbox:', TEST_EMAIL);
      console.log('   (Don\'t forget to check spam folder)');
      console.log('');
      console.log('✅ You can now enable email notifications in your app!');
      process.exit(0);
    }
  });
}
