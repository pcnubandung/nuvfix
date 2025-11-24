// Register Page JavaScript

// Initialize Feather Icons
feather.replace();

// Load Koperasi Info
async function loadKoperasiInfo() {
  try {
    const response = await fetch('/api/koperasi-info');
    const data = await response.json();
    
    if (data) {
      if (data.logo) {
        document.getElementById('headerLogo').src = data.logo;
      }
      if (data.nomor_telpon) {
        document.getElementById('contactPhone').textContent = data.nomor_telpon;
      }
    }
  } catch (error) {
    console.error('Error loading koperasi info:', error);
  }
}

// Generate Nomor Anggota
function generateNomorAnggota() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `NUV${year}${random}`;
}

// Form Validation
function validateForm(formData) {
  const errors = [];
  
  // Required fields
  if (!formData.nama_lengkap || formData.nama_lengkap.trim() === '') {
    errors.push('Nama lengkap harus diisi');
  }
  
  if (!formData.alamat || formData.alamat.trim() === '') {
    errors.push('Alamat harus diisi');
  }
  
  if (!formData.nomor_telpon || formData.nomor_telpon.trim() === '') {
    errors.push('Nomor telepon harus diisi');
  }
  
  // NIK validation (if provided)
  if (formData.nik && formData.nik.length !== 16) {
    errors.push('NIK harus 16 digit');
  }
  
  // Phone validation
  if (formData.nomor_telpon) {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    if (!phoneRegex.test(formData.nomor_telpon.replace(/\s/g, ''))) {
      errors.push('Format nomor telepon tidak valid');
    }
  }
  
  // Email validation (if provided)
  if (formData.email && formData.email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Format email tidak valid');
    }
  }
  
  // Username & Password validation (if provided)
  if (formData.username && formData.username.trim() !== '') {
    if (formData.username.length < 4) {
      errors.push('Username minimal 4 karakter');
    }
    
    if (!formData.password || formData.password.length < 6) {
      errors.push('Password minimal 6 karakter jika membuat akun portal');
    }
  }
  
  if (formData.password && formData.password.trim() !== '' && !formData.username) {
    errors.push('Username harus diisi jika membuat password');
  }
  
  return errors;
}

// Handle Form Submit
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Check agreement
  if (!document.getElementById('agreement').checked) {
    alert('Anda harus menyetujui syarat dan ketentuan');
    return;
  }
  
  // Get form data
  const formData = new FormData(e.target);
  
  // Create data object for validation (exclude files)
  const data = {};
  formData.forEach((value, key) => {
    if (key !== 'foto_ktp' && key !== 'pas_foto') {
      data[key] = typeof value === 'string' ? value.trim() : value;
    }
  });
  
  // Validate
  const errors = validateForm(data);
  if (errors.length > 0) {
    alert('Terjadi kesalahan:\n\n' + errors.join('\n'));
    return;
  }
  
  // Generate nomor anggota
  const nomorAnggota = generateNomorAnggota();
  const tanggalBergabung = new Date().toISOString().split('T')[0];
  
  // Add to FormData
  formData.append('nomor_anggota', nomorAnggota);
  formData.append('tanggal_bergabung', tanggalBergabung);
  formData.append('status', 'aktif');
  
  // Disable submit button
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i data-feather="loader"></i><span>Memproses...</span>';
  feather.replace();
  
  try {
    // Send to API with FormData (includes files)
    const response = await fetch('/api/register/anggota', {
      method: 'POST',
      body: formData // Don't set Content-Type, browser will set it with boundary
    });
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      // Show success modal
      document.getElementById('memberNumber').textContent = nomorAnggota;
      document.getElementById('successModal').classList.add('active');
      
      // Reset form
      e.target.reset();
      
      // Clear previews
      document.getElementById('preview_ktp').innerHTML = '';
      document.getElementById('preview_ktp').classList.remove('has-image');
      document.getElementById('preview_foto').innerHTML = '';
      document.getElementById('preview_foto').classList.remove('has-image');
    } else {
      alert('Pendaftaran gagal: ' + (result.message || 'Terjadi kesalahan'));
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-feather="user-plus"></i><span>Daftar Sekarang</span>';
      feather.replace();
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i data-feather="user-plus"></i><span>Daftar Sekarang</span>';
    feather.replace();
  }
});

// Show Terms Modal
function showTerms() {
  document.getElementById('termsModal').classList.add('active');
}

// Close Terms Modal
function closeTerms() {
  document.getElementById('termsModal').classList.remove('active');
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

// Image Preview Function
function setupImagePreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  
  if (input && preview) {
    input.addEventListener('change', function(e) {
      const file = e.target.files[0];
      
      if (file) {
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          alert('Ukuran file terlalu besar! Maksimal 2MB');
          input.value = '';
          preview.innerHTML = '';
          preview.classList.remove('has-image');
          return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('File harus berupa gambar!');
          input.value = '';
          preview.innerHTML = '';
          preview.classList.remove('has-image');
          return;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
          preview.classList.add('has-image');
        };
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML = '';
        preview.classList.remove('has-image');
      }
    });
  }
}

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
  loadKoperasiInfo();
  feather.replace();
  
  // Setup image preview
  setupImagePreview('foto_ktp', 'preview_ktp');
  setupImagePreview('pas_foto', 'preview_foto');
});

// Refresh icons periodically
setInterval(() => {
  feather.replace();
}, 1000);


// ===== CAMERA FUNCTIONS FOR REGISTER =====

let currentCameraStreamRegister = null;
let currentCameraInputIdRegister = null;
let currentCameraPreviewIdRegister = null;

// Open camera for register
window.openCameraRegister = function(inputId, previewId) {
  currentCameraInputIdRegister = inputId;
  currentCameraPreviewIdRegister = previewId;
  
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.id = 'cameraModalRegister';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 700px;">
      <div class="modal-header">
        <h2>Ambil Foto dengan Kamera</h2>
        <button class="modal-close" onclick="closeCameraRegister()">×</button>
      </div>
      <div style="padding: 20px;">
        <div style="position: relative; background: #000; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
          <video id="cameraVideoRegister" autoplay playsinline style="width: 100%; height: auto; display: block; max-height: 400px;"></video>
          <canvas id="cameraCanvasRegister" style="display: none;"></canvas>
        </div>
        
        <div id="cameraErrorRegister" style="display: none; padding: 12px; background: #ffebee; color: #c62828; border-radius: 8px; margin-bottom: 16px;">
          <i data-feather="alert-circle"></i>
          <span id="cameraErrorTextRegister"></span>
        </div>
        
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn-primary" onclick="capturePhotoRegister()" id="btnCaptureRegister">
            <i data-feather="camera"></i> Ambil Foto
          </button>
          <button type="button" class="btn-secondary" onclick="switchCameraRegister()" id="btnSwitchRegister">
            <i data-feather="refresh-cw"></i> Ganti Kamera
          </button>
          <button type="button" class="btn-danger" onclick="closeCameraRegister()">
            <i data-feather="x"></i> Batal
          </button>
        </div>
        
        <p style="text-align: center; color: #666; font-size: 12px; margin-top: 12px;">
          <i data-feather="info"></i> Pastikan pencahayaan cukup dan foto terlihat jelas
        </p>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  feather.replace();
  
  // Start camera
  startCameraRegister();
};

// Start camera
let currentFacingModeRegister = 'user'; // 'user' for front camera, 'environment' for back camera

async function startCameraRegister() {
  try {
    // Stop existing stream if any
    if (currentCameraStreamRegister) {
      currentCameraStreamRegister.getTracks().forEach(track => track.stop());
    }
    
    const constraints = {
      video: {
        facingMode: currentFacingModeRegister,
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    };
    
    currentCameraStreamRegister = await navigator.mediaDevices.getUserMedia(constraints);
    const video = document.getElementById('cameraVideoRegister');
    
    if (video) {
      video.srcObject = currentCameraStreamRegister;
      
      // Hide error message
      const errorDiv = document.getElementById('cameraErrorRegister');
      if (errorDiv) errorDiv.style.display = 'none';
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
    
    const errorDiv = document.getElementById('cameraErrorRegister');
    const errorText = document.getElementById('cameraErrorTextRegister');
    
    if (errorDiv && errorText) {
      errorDiv.style.display = 'flex';
      errorDiv.style.alignItems = 'center';
      errorDiv.style.gap = '8px';
      
      if (error.name === 'NotAllowedError') {
        errorText.textContent = 'Akses kamera ditolak. Silakan izinkan akses kamera di pengaturan browser.';
      } else if (error.name === 'NotFoundError') {
        errorText.textContent = 'Kamera tidak ditemukan. Pastikan perangkat memiliki kamera.';
      } else {
        errorText.textContent = 'Gagal mengakses kamera: ' + error.message;
      }
      
      feather.replace();
    }
  }
}

// Switch camera (front/back)
window.switchCameraRegister = async function() {
  currentFacingModeRegister = currentFacingModeRegister === 'user' ? 'environment' : 'user';
  await startCameraRegister();
};

// Capture photo
window.capturePhotoRegister = function() {
  const video = document.getElementById('cameraVideoRegister');
  const canvas = document.getElementById('cameraCanvasRegister');
  
  if (!video || !canvas) return;
  
  // Set canvas size to video size
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  // Draw video frame to canvas
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Convert canvas to blob
  canvas.toBlob(function(blob) {
    if (!blob) {
      alert('Gagal mengambil foto. Silakan coba lagi.');
      return;
    }
    
    // Create file from blob
    const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' });
    
    // Create FileList-like object
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    
    // Set to input file
    const input = document.getElementById(currentCameraInputIdRegister);
    if (input) {
      input.files = dataTransfer.files;
      
      // Trigger preview manually
      const preview = document.getElementById(currentCameraPreviewIdRegister);
      if (preview) {
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
          preview.classList.add('has-image');
          
          // Add success message
          setTimeout(() => {
            const successMsg = document.createElement('p');
            successMsg.style.cssText = 'color: #2e7d32; font-size: 12px; margin-top: 8px; text-align: center; position: absolute; bottom: 10px; left: 0; right: 0; background: rgba(255,255,255,0.9); padding: 5px; border-radius: 4px;';
            successMsg.innerHTML = '<i data-feather="check-circle" style="width: 14px; height: 14px;"></i> Foto berhasil diambil';
            preview.style.position = 'relative';
            preview.appendChild(successMsg);
            feather.replace();
            
            setTimeout(() => successMsg.remove(), 3000);
          }, 100);
        };
        reader.readAsDataURL(file);
      }
    }
    
    // Close camera modal
    closeCameraRegister();
  }, 'image/jpeg', 0.9);
};

// Close camera
window.closeCameraRegister = function() {
  // Stop camera stream
  if (currentCameraStreamRegister) {
    currentCameraStreamRegister.getTracks().forEach(track => track.stop());
    currentCameraStreamRegister = null;
  }
  
  // Remove modal
  const modal = document.getElementById('cameraModalRegister');
  if (modal) {
    modal.remove();
  }
  
  // Reset variables
  currentCameraInputIdRegister = null;
  currentCameraPreviewIdRegister = null;
  currentFacingModeRegister = 'user';
};

console.log('=== CAMERA FUNCTIONS FOR REGISTER LOADED ===');
