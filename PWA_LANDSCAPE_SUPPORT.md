# PWA Landscape Support - Tablet & Mobile

## Masalah
PWA hanya bisa tampil dalam mode portrait di tablet, tidak bisa landscape.

## Penyebab
Di file `manifest.json` ada konfigurasi:
```json
"orientation": "portrait-primary"
```

Ini membatasi aplikasi hanya bisa digunakan dalam mode portrait.

## Solusi yang Diterapkan

### 1. **Update Manifest.json**
File: `public/manifest.json`

**Sebelum:**
```json
"orientation": "portrait-primary"
```

**Sesudah:**
```json
"orientation": "any"
```

Nilai `"any"` memungkinkan aplikasi berotasi ke semua orientasi (portrait dan landscape).

### 2. **Membuat CSS Landscape**
File: `public/css/landscape.css`

CSS ini mengoptimalkan tampilan untuk berbagai ukuran layar dalam mode landscape:

#### a. **Tablet Landscape (768px - 1024px)**
- Sidebar width: 200px
- Stats grid: 3 kolom
- Charts grid: 2 kolom
- Form: 2 kolom layout
- Table: font-size 12px

#### b. **Mobile Landscape (< 768px)**
- Sidebar: hidden by default
- Compact header: 50px height
- Stats grid: 2 kolom
- Table: font-size 11px
- Modal: 95vw width

#### c. **Large Tablet Landscape (1025px - 1366px)**
- Sidebar width: 240px
- Stats grid: 3 kolom
- Charts grid: 2 kolom
- Table: font-size 13px

### 3. **Update Semua HTML Files**
Menambahkan `<link rel="stylesheet" href="css/landscape.css">` ke:
- ✅ `public/index.html` - Dashboard Admin
- ✅ `public/member.html` - Portal Member
- ✅ `public/landing.html` - Landing Page
- ✅ `public/login.html` - Login Page
- ✅ `public/register.html` - Register Page

## Fitur Landscape CSS

### 1. **Responsive Sidebar**
```css
/* Tablet landscape */
.sidebar { width: 200px; }

/* Mobile landscape - hidden by default */
.sidebar { transform: translateX(-100%); }
```

### 2. **Optimized Tables**
```css
.table-container {
  overflow-x: auto;
  max-width: 100%;
}
```

### 3. **Grid Layouts**
```css
/* Stats cards */
.stats-grid {
  grid-template-columns: repeat(3, 1fr);
}

/* Charts */
.charts-grid {
  grid-template-columns: repeat(2, 1fr);
}
```

### 4. **Touch Targets**
```css
/* Minimum 40px untuk touch-friendly */
button, .btn, a.nav-item {
  min-height: 40px;
  min-width: 40px;
}
```

### 5. **Modal Optimization**
```css
/* Tablet landscape */
.modal-content {
  max-width: 70vw;
  max-height: 85vh;
}

/* Mobile landscape */
.modal-content {
  max-width: 95vw;
  max-height: 90vh;
}
```

### 6. **Print Support**
```css
@media print and (orientation: landscape) {
  @page {
    size: landscape;
    margin: 15mm;
  }
}
```

## Cara Menggunakan

### 1. **Clear Cache & Reinstall PWA**
Karena manifest.json berubah, PWA perlu di-reinstall:

**Di Android/iOS:**
1. Uninstall PWA yang lama
2. Buka browser (Chrome/Safari)
3. Akses aplikasi
4. Install PWA lagi dari browser

**Di Desktop:**
1. Uninstall PWA dari Chrome
2. Clear cache (Ctrl+Shift+Delete)
3. Refresh halaman (Ctrl+F5)
4. Install PWA lagi

### 2. **Test Landscape Mode**
**Di Tablet:**
1. Buka aplikasi PWA
2. Rotate tablet ke landscape
3. Aplikasi harus otomatis menyesuaikan

**Di Browser (untuk testing):**
1. Buka Developer Tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Pilih device: iPad, iPad Pro, atau custom
4. Rotate device icon untuk test landscape

### 3. **Verify Orientation**
Di browser console:
```javascript
// Check current orientation
console.log(screen.orientation.type);
// Output: "landscape-primary" atau "portrait-primary"

// Check manifest
fetch('/manifest.json')
  .then(r => r.json())
  .then(m => console.log('Orientation:', m.orientation));
// Output: "any"
```

## Breakpoints

### Mobile
- **Portrait**: < 768px
- **Landscape**: < 768px (orientation: landscape)

### Tablet
- **Portrait**: 768px - 1024px
- **Landscape**: 768px - 1024px (orientation: landscape)

### Desktop
- **Small**: 1025px - 1366px
- **Medium**: 1367px - 1920px
- **Large**: > 1920px

## Supported Orientations

Dengan `"orientation": "any"`, aplikasi mendukung:
- ✅ `portrait-primary` - Portrait normal
- ✅ `portrait-secondary` - Portrait terbalik (180°)
- ✅ `landscape-primary` - Landscape normal
- ✅ `landscape-secondary` - Landscape terbalik (180°)

## Testing Checklist

### Tablet Landscape
- [ ] Sidebar terlihat dengan baik (200px)
- [ ] Stats cards dalam 3 kolom
- [ ] Charts dalam 2 kolom
- [ ] Table scrollable horizontal
- [ ] Form dalam 2 kolom
- [ ] Modal tidak terlalu besar (70vw)
- [ ] Touch targets minimal 40px

### Mobile Landscape
- [ ] Sidebar hidden by default
- [ ] Header compact (50px)
- [ ] Stats cards dalam 2 kolom
- [ ] Table readable (font 11px)
- [ ] Modal hampir full width (95vw)
- [ ] Buttons touch-friendly

### Rotation
- [ ] Smooth transition saat rotate
- [ ] No layout breaking
- [ ] Content tetap readable
- [ ] No horizontal scroll (kecuali table)

## Troubleshooting

### Landscape Tidak Berfungsi
1. **Clear PWA cache**
   - Uninstall dan reinstall PWA
   
2. **Check manifest**
   ```javascript
   fetch('/manifest.json').then(r => r.json()).then(console.log)
   ```
   
3. **Force refresh**
   - Ctrl+F5 atau Cmd+Shift+R

### Layout Rusak di Landscape
1. **Check CSS loaded**
   ```javascript
   // Di console
   document.querySelector('link[href*="landscape.css"]')
   ```
   
2. **Check media query**
   ```javascript
   window.matchMedia('(orientation: landscape)').matches
   ```

### PWA Tidak Update
1. **Unregister service worker**
   ```javascript
   navigator.serviceWorker.getRegistrations()
     .then(registrations => {
       registrations.forEach(r => r.unregister())
     })
   ```
   
2. **Clear all cache**
   - Settings > Privacy > Clear browsing data
   - Check "Cached images and files"

## Browser Support

### Desktop
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

### Mobile
- ✅ Chrome Android 90+
- ✅ Safari iOS 14+
- ✅ Samsung Internet 14+
- ✅ Firefox Android 88+

### Tablet
- ✅ iPad (Safari 14+)
- ✅ Android Tablet (Chrome 90+)
- ✅ Surface (Edge 90+)

## File yang Diupdate
- ✅ `public/manifest.json` - Orientation: "any"
- ✅ `public/css/landscape.css` - New file
- ✅ `public/index.html` - Added landscape.css
- ✅ `public/member.html` - Added landscape.css
- ✅ `public/landing.html` - Added landscape.css
- ✅ `public/login.html` - Added landscape.css
- ✅ `public/register.html` - Added landscape.css

## Status
✅ **Selesai** - PWA sekarang mendukung landscape di tablet dan mobile!

## Next Steps
1. Uninstall PWA yang lama
2. Clear browser cache
3. Reinstall PWA
4. Test di tablet dengan rotate ke landscape
5. Enjoy! 🎉
