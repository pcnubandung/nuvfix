# ⚡ Email Config Quick Fix

## 🔴 Current Problem

Railway variables menunjukkan:
```
EMAIL_HOST=mail.hostinger.com  ❌ SALAH
EMAIL_PORT=465
EMAIL_SECURE=false  ❌ SALAH (port 465 harus true)
```

## ✅ Solution

### Update Railway Variables:

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
```

**ATAU** gunakan TLS:

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

## 🧪 Test Locally

```bash
# 1. Create .env file
cat > .env << EOF
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=nuvibes@nukotabandung.or.id
EMAIL_PASSWORD=Koperasi@nuvibes1
EMAIL_FROM=Koperasi NU Vibes <nuvibes@nukotabandung.or.id>
EOF

# 2. Run test
node test-email-config.js

# 3. Check result
# ✅ Success = Email configuration OK
# ❌ Failed = Check error message
```

## 📝 Railway Update Steps

1. **Login Railway Dashboard**
2. **Go to Variables tab**
3. **Update these 3 variables:**
   - `EMAIL_HOST` → `smtp.hostinger.com`
   - `EMAIL_PORT` → `465`
   - `EMAIL_SECURE` → `true`
4. **Save & Redeploy**
5. **Check logs for:**
   ```
   ✅ Email configuration verified
   ```

## 🎯 Quick Test Commands

```bash
# Test 1: Comprehensive
node test-email-config.js

# Test 2: Simple (specify email)
node test-email-simple.js your-email@example.com

# Test 3: Via Railway CLI
railway run node test-email-simple.js
```

## 🔍 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `EAUTH` | Check username/password |
| `ECONNREFUSED` | Change `mail.` to `smtp.` |
| `Certificate error` | Port 465 needs `SECURE=true` |
| `ETIMEDOUT` | Check firewall/network |

## ✅ Correct Configuration

```env
# Hostinger SSL (Recommended)
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=nuvibes@nukotabandung.or.id
EMAIL_PASSWORD=Koperasi@nuvibes1
EMAIL_FROM=Koperasi NU Vibes <nuvibes@nukotabandung.or.id>
ENABLE_EMAIL_NOTIFICATIONS=true
APP_URL=https://nuvibes.up.railway.app
```

## 🚀 After Fix

1. Deploy to Railway
2. Register new member with email
3. Check email inbox
4. Verify welcome email received

---

**Time to fix:** 2 minutes
**Difficulty:** Easy
