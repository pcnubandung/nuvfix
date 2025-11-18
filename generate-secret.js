// Generate JWT Secret Key
// Usage: node generate-secret.js

const crypto = require('crypto');

console.log('\n🔐 JWT Secret Key Generator\n');
console.log('Generated JWT_SECRET:');
console.log('─────────────────────────────────────────────────────────────────');

const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);

console.log('─────────────────────────────────────────────────────────────────');
console.log('\n📝 Add this to your .env file:');
console.log(`JWT_SECRET=${secret}`);
console.log('\n⚠️  Keep this secret safe and never commit it to git!\n');
