// Simple Email Test - For Railway
// Run: node test-email-simple.js your-email@example.com

const nodemailer = require('nodemailer');

const testEmail = process.argv[2] || 'nuvibes@nukotabandung.or.id';

console.log('🧪 Simple Email Test');
console.log('📧 Sending to:', testEmail);
console.log('');

// Get config from environment
const config = {
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};

console.log('Config:', {
  host: config.host,
  port: config.port,
  secure: config.secure,
  user: config.auth.user,
  pass: config.auth.pass ? '***' : 'NOT SET'
});
console.log('');

if (!config.auth.pass) {
  console.log('❌ EMAIL_PASSWORD not set!');
  process.exit(1);
}

const transporter = nodemailer.createTransport(config);

// Verify
transporter.verify((err, success) => {
  if (err) {
    console.log('❌ Connection failed:', err.message);
    process.exit(1);
  }
  
  console.log('✅ Connection OK');
  
  // Send
  transporter.sendMail({
    from: process.env.EMAIL_FROM || config.auth.user,
    to: testEmail,
    subject: 'Test Email - Koperasi NU Vibes',
    text: 'Test email berhasil! Konfigurasi email sudah benar.'
  }, (err, info) => {
    if (err) {
      console.log('❌ Send failed:', err.message);
      process.exit(1);
    }
    
    console.log('✅ Email sent!');
    console.log('   Message ID:', info.messageId);
    console.log('');
    console.log('🎉 Success! Check your inbox.');
    process.exit(0);
  });
});
