# 🔧 Last Resort: Use IP Address Directly

## Try This First

Update Railway variable:

```env
EMAIL_HOST=172.65.255.143
```

This is Hostinger's IPv4 address, bypassing DNS resolution.

Keep other settings:
```env
EMAIL_PORT=587
EMAIL_SECURE=false
```

## If This Doesn't Work

Switch to Gmail SMTP (most reliable for cloud platforms).

---

**Test this, if still fails, we'll switch to Gmail.**
