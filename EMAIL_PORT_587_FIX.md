# 🔧 Quick Fix: Change to Port 587

## Problem
Port 465 (SSL) masih error dengan IPv6.

## Solution
Ubah ke port 587 (TLS) yang lebih compatible.

## Railway Variables Update

Ubah 2 variables ini:

```env
EMAIL_PORT=587
EMAIL_SECURE=false
```

**Jangan ubah yang lain!** Tetap:
```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_USER=nuvibes@nukotabandung.or.id
EMAIL_PASSWORD=Koperasi@nuvibes1
EMAIL_FROM=Koperasi NU Vibes <nuvibes@nukotabandung.or.id>
ENABLE_EMAIL_NOTIFICATIONS=true
```

## Why Port 587?

- Port 587 = STARTTLS (more compatible)
- Port 465 = SSL (older, may have IPv6 issues)
- Port 587 works better with cloud platforms

## After Update

Railway will auto-redeploy. Check logs for:

```
✅ Email configuration verified
```

---

**Time to fix:** 1 minute
