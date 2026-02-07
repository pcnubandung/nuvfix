// Quick Email Diagnostic
// Run: node diagnose-email.js

console.log('🔍 Email Configuration Diagnostic\n');

console.log('Environment Variables:');
console.log('  ENABLE_EMAIL_NOTIFICATIONS:', process.env.ENABLE_EMAIL_NOTIFICATIONS);
console.log('  EMAIL_HOST:', process.env.EMAIL_HOST || 'NOT SET');
console.log('  EMAIL_PORT:', process.env.EMAIL_PORT || 'NOT SET');
console.log('  EMAIL_SECURE:', process.env.EMAIL_SECURE || 'NOT SET');
console.log('  EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('  EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***' + process.env.EMAIL_PASSWORD.slice(-4) : 'NOT SET');
console.log('  EMAIL_FROM:', process.env.EMAIL_FROM || 'NOT SET');
console.log('');

console.log('Checks:');
console.log('  ✓ ENABLE_EMAIL_NOTIFICATIONS === "true":', process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true');
console.log('  ✓ EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
console.log('  ✓ EMAIL_HOST exists:', !!process.env.EMAIL_HOST);
console.log('  ✓ EMAIL_USER exists:', !!process.env.EMAIL_USER);
console.log('');

if (process.env.ENABLE_EMAIL_NOTIFICATIONS !== 'true') {
  console.log('❌ PROBLEM: ENABLE_EMAIL_NOTIFICATIONS is not "true"');
  console.log('   Current value:', JSON.stringify(process.env.ENABLE_EMAIL_NOTIFICATIONS));
  console.log('   Expected: "true" (string)');
  console.log('');
  console.log('   Fix: Set ENABLE_EMAIL_NOTIFICATIONS=true in Railway');
}

if (!process.env.EMAIL_PASSWORD) {
  console.log('❌ PROBLEM: EMAIL_PASSWORD is not set');
  console.log('   Fix: Set EMAIL_PASSWORD in Railway');
}

if (!process.env.EMAIL_HOST) {
  console.log('❌ PROBLEM: EMAIL_HOST is not set');
  console.log('   Fix: Set EMAIL_HOST=smtp.hostinger.com in Railway');
}

if (!process.env.EMAIL_USER) {
  console.log('❌ PROBLEM: EMAIL_USER is not set');
  console.log('   Fix: Set EMAIL_USER=nuvibes@nukotabandung.or.id in Railway');
}

console.log('');
console.log('Summary:');
const allGood = 
  process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true' &&
  process.env.EMAIL_PASSWORD &&
  process.env.EMAIL_HOST &&
  process.env.EMAIL_USER;

if (allGood) {
  console.log('✅ All environment variables are set correctly!');
  console.log('   Email notifications should work.');
} else {
  console.log('❌ Some environment variables are missing or incorrect.');
  console.log('   Email notifications will NOT work until fixed.');
}
