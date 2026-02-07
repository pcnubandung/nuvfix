# ✅ Email Configuration Verification Checklist

## 🔍 What to Look for in Railway Logs

Setelah deploy, Railway logs akan menampilkan:

### ✅ Success Output:

```
🔧 Server Configuration:
  - PORT: 3000
  - UPLOAD_PATH: /app/data/uploads
  ...

📧 Email Configuration:
  - HOST: smtp.hostinger.com
  - PORT: 465
  - SECURE: true
  - USER: nuvibes@nukotabandung.or.id
  - PASSWORD: ***bes1
  - FROM: Koperasi NU Vibes <nuvibes@nukotabandung.or.id>

📧 Email transporter created
✅ Email configuration verified
✅ Email notifications are enabled and configured correctly
```

### ❌ Error Output:

```
📧 Email Configuration:
  - HOST: smtp.hostinger.com
  - PORT: 465
  - SECURE: true
  - USER: nuvibes@nukotabandung.or.id
  - PASSWORD: ***bes1
  - FROM: Koperasi NU Vibes <nuvibes@nukotabandung.or.id>

📧 Email transporter created
❌ Email configuration error: Invalid login: 535 Authentication failed
⚠️ Email notifications enabled but configuration has issues
   Check EMAIL_HOST, EMAIL_USER, and EMAIL_PASSWORD
```

### ⚠️ Disabled Output:

```
⚠️ Email notifications are DISABLED
   Set ENABLE_EMAIL_NOTIFICATIONS=true to enable
```

## 📋 Railway Variables Checklist

Pastikan semua variables ini ada dan benar:

- [ ] `EMAIL_HOST` = `smtp.hostinger.com`
- [ ] `EMAIL_PORT` = `465`
- [ ] `EMAIL_SECURE` = `true`
- [ ] `EMAIL_USER` = `nuvibes@nukotabandung.or.id`
- [ ] `EMAIL_PASSWORD` = `Koperasi@nuvibes1`
- [ ] `EMAIL_FROM` = `Koperasi NU Vibes <nuvibes@nukotabandung.or.id>`
- [ ] `ENABLE_EMAIL_NOTIFICATIONS` = `true`
- [ ] `APP_URL` = `https://nuvibes.up.railway.app`

## 🧪 Test Steps

### Step 1: Deploy & Check Logs

1. Push code ke Git
2. Railway auto-deploy
3. Buka Railway logs
4. Cari output "📧 Email Configuration"
5. Verify ada "✅ Email configuration verified"

### Step 2: Test Welcome Email

1. Buka aplikasi
2. Daftar anggota baru dengan email valid
3. Cek Railway logs untuk:
   ```
   📧 Sending welcome email to: test@example.com
   ✅ Email sent: <message-id>
   ```
4. Cek inbox email member

### Step 3: Test Activation Email

1. Login sebagai admin
2. Edit anggota, ubah status ke "aktif"
3. Cek Railway logs untuk:
   ```
   📧 Sending account activated email to: test@example.com
   ✅ Email sent: <message-id>
   ```
4. Cek inbox email member

### Step 4: Test Password Changed Email

1. Login sebagai member
2. Ganti password
3. Cek Railway logs untuk:
   ```
   📧 Sending password changed email to: test@example.com
   ✅ Email sent: <message-id>
   ```
4. Cek inbox email member

## 🔧 Troubleshooting

### Logs tidak muncul "Email Configuration"

**Penyebab:** `ENABLE_EMAIL_NOTIFICATIONS` tidak di-set atau bukan `true`

**Solusi:**
```
ENABLE_EMAIL_NOTIFICATIONS=true
```

### Logs muncul "Email configuration error"

**Penyebab:** Username, password, atau host salah

**Solusi:**
1. Verify credentials di Hostinger panel
2. Test dengan script lokal:
   ```bash
   node test-email-config.js
   ```
3. Jika lokal berhasil tapi Railway gagal, ada typo di Railway variables

### Email tidak terkirim (no logs)

**Penyebab:** Code tidak sampai ke email service

**Solusi:**
1. Cek apakah endpoint dipanggil
2. Cek apakah ada error sebelum email service
3. Cek apakah `ENABLE_EMAIL_NOTIFICATIONS=true`

### Email terkirim tapi tidak masuk inbox

**Penyebab:** Email masuk spam atau blocked

**Solusi:**
1. Cek folder Spam
2. Add `nuvibes@nukotabandung.or.id` ke contacts
3. Setup SPF/DKIM di DNS (hubungi admin domain)

## 📊 Expected Behavior

| Action | Log Output | Email Sent |
|--------|-----------|------------|
| Server Start | ✅ Email configuration verified | No |
| Register Member | 📧 Sending welcome email | Yes |
| Activate Member | 📧 Sending account activated email | Yes |
| Change Password | 📧 Sending password changed email | Yes |
| Payment Simpanan | 📧 Sending payment notification | Yes (future) |

## 🎯 Success Criteria

✅ **Email system is working if:**

1. Railway logs show "✅ Email configuration verified"
2. Test welcome email received in inbox
3. Email not in spam folder
4. HTML formatting looks good
5. All links in email work

## 📝 Common Mistakes

### 1. Wrong Host
❌ `mail.hostinger.com`
✅ `smtp.hostinger.com`

### 2. Wrong Port/Secure Combination
❌ Port 465 + SECURE=false
✅ Port 465 + SECURE=true

❌ Port 587 + SECURE=true
✅ Port 587 + SECURE=false

### 3. Typo in Variables
❌ `EMAIL_PASWORD` (missing S)
✅ `EMAIL_PASSWORD`

### 4. Not Enabled
❌ `ENABLE_EMAIL_NOTIFICATIONS=false`
✅ `ENABLE_EMAIL_NOTIFICATIONS=true`

### 5. Wrong Email Format
❌ `EMAIL_FROM=nuvibes@nukotabandung.or.id`
✅ `EMAIL_FROM=Koperasi NU Vibes <nuvibes@nukotabandung.or.id>`

## 🚀 Quick Commands

```bash
# Test locally
node test-email-config.js

# Test with specific email
node test-email-simple.js your-email@example.com

# Check Railway logs
railway logs

# Redeploy Railway
git push origin main
```

## 📞 Need Help?

If still not working after checking everything:

1. **Screenshot Railway logs** (Email Configuration section)
2. **Screenshot Railway variables** (hide password)
3. **Run local test** and share output
4. **Check Hostinger email panel** - is email active?

---

**Next:** After verification successful, test with real user registration!
