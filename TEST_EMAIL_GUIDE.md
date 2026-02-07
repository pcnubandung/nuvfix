# 🧪 Email Configuration Testing Guide

## 📋 Files Created

1. **test-email-config.js** - Comprehensive test with troubleshooting
2. **test-email-simple.js** - Simple quick test

## 🚀 How to Test

### Method 1: Local Testing (Recommended)

**Step 1: Set Environment Variables**

Create `.env` file (jangan commit ke Git!):

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=nuvibes@nukotabandung.or.id
EMAIL_PASSWORD=Koperasi@nuvibes1
EMAIL_FROM=Koperasi NU Vibes <nuvibes@nukotabandung.or.id>
```

**Step 2: Run Test**

```bash
# Comprehensive test
node test-email-config.js

# Simple test
node test-email-simple.js your-email@example.com
```

### Method 2: Railway Testing

**Step 1: Update Railway Variables**

Di Railway Dashboard → Variables, pastikan:

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=nuvibes@nukotabandung.or.id
EMAIL_PASSWORD=Koperasi@nuvibes1
EMAIL_FROM=Koperasi NU Vibes <nuvibes@nukotabandung.or.id>
ENABLE_EMAIL_NOTIFICATIONS=true
```

**Step 2: Deploy & Check Logs**

Setelah deploy, cek Railway logs untuk:

```
📧 Email transporter created
✅ Email configuration verified
```

**Step 3: Test via Railway CLI**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Run test
railway run node test-email-simple.js
```

## 🔍 Troubleshooting

### Error: EAUTH - Authentication failed

**Penyebab:**
- Username atau password salah
- Email belum diaktifkan di Hostinger

**Solusi:**
1. Cek username: `nuvibes@nukotabandung.or.id`
2. Cek password: `Koperasi@nuvibes1`
3. Login ke Hostinger panel untuk verify email aktif
4. Pastikan tidak ada typo di Railway variables

### Error: ECONNREFUSED - Connection refused

**Penyebab:**
- Host atau port salah
- Firewall blocking

**Solusi:**
1. Cek host: `smtp.hostinger.com` (bukan `mail.hostinger.com`)
2. Cek port: `465` untuk SSL atau `587` untuk TLS
3. Test dari komputer lain / network lain

### Error: ETIMEDOUT - Connection timeout

**Penyebab:**
- Network issue
- Firewall blocking port 465/587

**Solusi:**
1. Cek koneksi internet
2. Coba dari network lain
3. Hubungi Hostinger support

### Error: Certificate error

**Penyebab:**
- EMAIL_SECURE tidak sesuai dengan port

**Solusi:**
- Port 465 → `EMAIL_SECURE=true`
- Port 587 → `EMAIL_SECURE=false`

## ✅ Expected Output (Success)

```
🧪 Testing Email Configuration...

📧 Configuration:
  Host: smtp.hostinger.com
  Port: 465
  Secure: true
  User: nuvibes@nukotabandung.or.id
  Password: ***bes1
  From: Koperasi NU Vibes <nuvibes@nukotabandung.or.id>

🔍 Test 1: Verifying SMTP connection...
✅ SMTP Connection Successful!
   Server is ready to send emails

📨 Test 2: Sending test email...
   Sending to: nuvibes@nukotabandung.or.id
✅ Test email sent successfully!
   Message ID: <abc123@nukotabandung.or.id>
   Response: 250 OK

🎉 Email configuration is working perfectly!

📬 Check your inbox: nuvibes@nukotabandung.or.id
   (Don't forget to check spam folder)

✅ You can now enable email notifications in your app!
```

## 📧 Recommended Configuration

### For Hostinger (SSL) - RECOMMENDED

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=nuvibes@nukotabandung.or.id
EMAIL_PASSWORD=Koperasi@nuvibes1
EMAIL_FROM=Koperasi NU Vibes <nuvibes@nukotabandung.or.id>
```

### For Hostinger (TLS) - Alternative

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=nuvibes@nukotabandung.or.id
EMAIL_PASSWORD=Koperasi@nuvibes1
EMAIL_FROM=Koperasi NU Vibes <nuvibes@nukotabandung.or.id>
```

## 🎯 Quick Checklist

Before testing:
- [ ] `nodemailer` installed (`npm install nodemailer`)
- [ ] Environment variables set
- [ ] Email & password correct
- [ ] Port matches secure setting (465=true, 587=false)

After successful test:
- [ ] Test email received in inbox
- [ ] Not in spam folder
- [ ] HTML formatting looks good
- [ ] Ready to enable in app

## 🔐 Security Notes

1. **Never commit `.env` file to Git**
   - Add `.env` to `.gitignore`

2. **Use Railway environment variables**
   - Set in Railway Dashboard
   - Not in code

3. **Password security**
   - Use strong password
   - Change regularly
   - Don't share

## 📞 Support

If test fails after trying all solutions:

1. **Check Hostinger Status**
   - https://www.hostinger.com/status

2. **Contact Hostinger Support**
   - Live chat available
   - Provide error message

3. **Alternative: Use Gmail**
   - Setup App Password
   - Use `smtp.gmail.com:587`

## 🎉 Next Steps

After successful test:

1. ✅ Update Railway variables
2. ✅ Deploy application
3. ✅ Test with real user registration
4. ✅ Monitor email delivery
5. ✅ Check spam rate

---

**Status:** Ready to test
**Estimated time:** 5 minutes
**Difficulty:** Easy
