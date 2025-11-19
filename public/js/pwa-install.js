// PWA Installation and Service Worker Registration
// Koperasi NU Vibes

let deferredPrompt;
let isInstalled = false;

// Check if app is already installed
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
  isInstalled = true;
  console.log('[PWA] App is running in standalone mode');
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered successfully:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('[PWA] New Service Worker found, installing...');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] New version available! Refresh to update.');
              showUpdateNotification();
            }
          });
        });
      })
      .catch((error) => {
        console.error('[PWA] Service Worker registration failed:', error);
      });

    // Check for updates every hour
    setInterval(() => {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.update();
        }
      });
    }, 60 * 60 * 1000);
  });
}

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] beforeinstallprompt event fired');
  
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show install button
  showInstallButton();
});

// Listen for app installed event
window.addEventListener('appinstalled', () => {
  console.log('[PWA] App installed successfully');
  isInstalled = true;
  hideInstallButton();
  showInstalledNotification();
  
  // Clear the deferredPrompt
  deferredPrompt = null;
});

// Show install button
function showInstallButton() {
  if (isInstalled) return;
  
  // Check if install button already exists
  let installBtn = document.getElementById('pwa-install-btn');
  
  if (!installBtn) {
    // Create install button
    installBtn = document.createElement('button');
    installBtn.id = 'pwa-install-btn';
    installBtn.className = 'pwa-install-button';
    installBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      <span>Install Aplikasi</span>
    `;
    
    installBtn.addEventListener('click', installApp);
    
    // Add to body
    document.body.appendChild(installBtn);
    
    // Add styles if not exists
    if (!document.getElementById('pwa-install-styles')) {
      const style = document.createElement('style');
      style.id = 'pwa-install-styles';
      style.textContent = `
        .pwa-install-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.4);
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 9999;
          transition: all 0.3s;
          animation: slideInUp 0.5s ease-out;
        }
        
        .pwa-install-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(46, 125, 50, 0.5);
        }
        
        .pwa-install-button:active {
          transform: translateY(0);
        }
        
        @keyframes slideInUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .pwa-install-button {
            bottom: 80px;
            right: 16px;
            font-size: 13px;
            padding: 10px 20px;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Hide install button
function hideInstallButton() {
  const installBtn = document.getElementById('pwa-install-btn');
  if (installBtn) {
    installBtn.style.animation = 'slideOutDown 0.5s ease-out';
    setTimeout(() => {
      installBtn.remove();
    }, 500);
  }
}

// Install app
async function installApp() {
  if (!deferredPrompt) {
    console.log('[PWA] Install prompt not available');
    return;
  }
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log(`[PWA] User response to install prompt: ${outcome}`);
  
  if (outcome === 'accepted') {
    console.log('[PWA] User accepted the install prompt');
  } else {
    console.log('[PWA] User dismissed the install prompt');
  }
  
  // Clear the deferredPrompt
  deferredPrompt = null;
  
  // Hide install button
  hideInstallButton();
}

// Show update notification
function showUpdateNotification() {
  // Check if notification already exists
  if (document.getElementById('pwa-update-notification')) return;
  
  const notification = document.createElement('div');
  notification.id = 'pwa-update-notification';
  notification.className = 'pwa-update-notification';
  notification.innerHTML = `
    <div class="pwa-update-content">
      <div class="pwa-update-icon">🔄</div>
      <div class="pwa-update-text">
        <strong>Update Tersedia!</strong>
        <p>Versi baru aplikasi sudah tersedia</p>
      </div>
      <button class="pwa-update-btn" onclick="updateApp()">Update</button>
      <button class="pwa-update-close" onclick="closeUpdateNotification()">✕</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Add styles
  if (!document.getElementById('pwa-update-styles')) {
    const style = document.createElement('style');
    style.id = 'pwa-update-styles';
    style.textContent = `
      .pwa-update-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 400px;
      }
      
      .pwa-update-content {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .pwa-update-icon {
        font-size: 32px;
        animation: rotate 2s linear infinite;
      }
      
      .pwa-update-text {
        flex: 1;
      }
      
      .pwa-update-text strong {
        color: #2E7D32;
        font-size: 14px;
        display: block;
        margin-bottom: 4px;
      }
      
      .pwa-update-text p {
        color: #666;
        font-size: 13px;
        margin: 0;
      }
      
      .pwa-update-btn {
        background: #2E7D32;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .pwa-update-btn:hover {
        background: #1B5E20;
      }
      
      .pwa-update-close {
        background: none;
        border: none;
        color: #999;
        font-size: 20px;
        cursor: pointer;
        padding: 4px;
        line-height: 1;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @media (max-width: 768px) {
        .pwa-update-notification {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Update app
function updateApp() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    });
  }
}

// Close update notification
function closeUpdateNotification() {
  const notification = document.getElementById('pwa-update-notification');
  if (notification) {
    notification.style.animation = 'slideOutRight 0.5s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }
}

// Show installed notification
function showInstalledNotification() {
  const notification = document.createElement('div');
  notification.className = 'pwa-installed-notification';
  notification.innerHTML = `
    <div class="pwa-installed-content">
      <div class="pwa-installed-icon">✓</div>
      <div class="pwa-installed-text">
        <strong>Aplikasi Terinstall!</strong>
        <p>Koperasi NU Vibes siap digunakan</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Add styles
  if (!document.getElementById('pwa-installed-styles')) {
    const style = document.createElement('style');
    style.id = 'pwa-installed-styles';
    style.textContent = `
      .pwa-installed-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2E7D32, #4CAF50);
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(46, 125, 50, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 350px;
      }
      
      .pwa-installed-content {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .pwa-installed-icon {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }
      
      .pwa-installed-text strong {
        font-size: 14px;
        display: block;
        margin-bottom: 4px;
      }
      
      .pwa-installed-text p {
        font-size: 13px;
        margin: 0;
        opacity: 0.9;
      }
      
      @media (max-width: 768px) {
        .pwa-installed-notification {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
}

// Export functions for global use
window.installApp = installApp;
window.updateApp = updateApp;
window.closeUpdateNotification = closeUpdateNotification;

console.log('[PWA] Installation script loaded');
