# ✅ Railway Deployment Checklist

Gunakan checklist ini untuk memastikan deployment berhasil.

## Pre-Deployment

- [ ] Project sudah di Git
- [ ] Sudah push ke GitHub/GitLab
- [ ] File `.gitignore` sudah benar (tidak commit `node_modules`, `.env`, `*.db`)
- [ ] `package.json` sudah ada `"start": "node server.js"`
- [ ] Sudah test lokal dengan `npm start`

## Railway Setup

- [ ] Akun Railway sudah dibuat
- [ ] Login dengan GitHub
- [ ] Project baru sudah dibuat
- [ ] Repository sudah dipilih
- [ ] Deployment pertama berhasil

## Volume Configuration (CRITICAL!)

- [ ] Volume sudah ditambahkan
- [ ] Mount path: `/app/data`
- [ ] Volume status: Active

## Environment Variables

Pastikan semua variable ini sudah diset:

- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`
- [ ] `DATABASE_PATH=/app/data/koperasi.db`
- [ ] `UPLOAD_PATH=/app/data/uploads`
- [ ] `MAX_FILE_SIZE=5242880`
- [ ] `JWT_SECRET=<generated-32-chars>` ⚠️ PENTING!

### Generate JWT_SECRET

```bash
node generate-secret.js
```

Copy hasilnya ke Railway variables.

## Post-Deployment Testing

- [ ] Aplikasi bisa diakses via Railway URL
- [ ] Landing page muncul dengan benar
- [ ] Login admin berhasil (admin/admin123)
- [ ] Dashboard muncul dengan data
- [ ] Bisa tambah anggota baru
- [ ] Upload foto berhasil
- [ ] Data tersimpan setelah restart

## Security

- [ ] Password admin sudah diganti
- [ ] JWT_SECRET menggunakan random string (bukan default)
- [ ] Environment variables tidak di-commit ke Git
- [ ] HTTPS sudah aktif (otomatis dari Railway)

## Optional

- [ ] Custom domain sudah disetup
- [ ] DNS sudah dikonfigurasi
- [ ] Backup database pertama sudah dibuat
- [ ] Monitoring/alerts sudah disetup

## Troubleshooting

### Database Issues

**Symptom:** Data hilang setelah restart
**Fix:** 
- [ ] Cek volume sudah di-mount
- [ ] Cek `DATABASE_PATH=/app/data/koperasi.db`

**Symptom:** Database locked error
**Fix:**
- [ ] Restart service
- [ ] Cek tidak ada multiple instances

### Upload Issues

**Symptom:** File upload gagal
**Fix:**
- [ ] Cek `UPLOAD_PATH=/app/data/uploads`
- [ ] Cek folder permissions

### Authentication Issues

**Symptom:** Login tidak work
**Fix:**
- [ ] Cek `JWT_SECRET` sudah diset
- [ ] Cek session configuration

### Performance Issues

**Symptom:** App lambat atau timeout
**Fix:**
- [ ] Upgrade Railway plan
- [ ] Optimize database queries
- [ ] Add caching

## Monitoring

### Check Logs

```bash
# Via CLI
railway logs

# Via Dashboard
Deployments > View Logs
```

### Check Metrics

- [ ] CPU usage normal (<80%)
- [ ] Memory usage normal (<80%)
- [ ] Response time <1s
- [ ] No error logs

## Backup Strategy

### Manual Backup

```bash
railway run cat /app/data/koperasi.db > backup-$(date +%Y%m%d).db
```

### Scheduled Backup

- [ ] Setup cron job untuk backup otomatis
- [ ] Store backup di cloud storage (Google Drive, Dropbox, S3)
- [ ] Test restore procedure

## Support

Jika ada masalah:

1. **Check Logs:** Railway Dashboard > Deployments > View Logs
2. **Check Docs:** [RAILWAY-DEPLOYMENT.md](RAILWAY-DEPLOYMENT.md)
3. **Railway Discord:** https://discord.gg/railway
4. **Railway Docs:** https://docs.railway.app

---

## Quick Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Restart service
railway restart

# Open dashboard
railway open

# Run command in Railway environment
railway run <command>

# Download database backup
railway run cat /app/data/koperasi.db > backup.db
```

---

**Status:** 
- [ ] Development
- [ ] Testing
- [ ] Production Ready ✅

**Deployed URL:** _____________________________

**Last Updated:** _____________________________
