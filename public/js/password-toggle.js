// ===== PASSWORD TOGGLE UTILITY =====
// Universal password show/hide functionality

/**
 * Add password toggle button to a password input field
 * @param {HTMLInputElement} passwordInput - The password input element
 */
function addPasswordToggle(passwordInput) {
  if (!passwordInput || passwordInput.type !== 'password') return;
  
  // Check if toggle already exists
  if (passwordInput.parentElement.classList.contains('password-input-wrapper')) return;
  
  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'password-input-wrapper';
  wrapper.style.position = 'relative';
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  
  // Wrap the input
  passwordInput.parentNode.insertBefore(wrapper, passwordInput);
  wrapper.appendChild(passwordInput);
  
  // Adjust input style
  passwordInput.style.paddingRight = '40px';
  
  // Create toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'password-toggle-btn';
  toggleBtn.innerHTML = '<i data-feather="eye"></i>';
  toggleBtn.style.cssText = `
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: color 0.2s;
  `;
  
  toggleBtn.addEventListener('mouseenter', () => {
    toggleBtn.style.color = '#2E7D32';
  });
  
  toggleBtn.addEventListener('mouseleave', () => {
    toggleBtn.style.color = '#666';
  });
  
  // Toggle functionality
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleBtn.innerHTML = isPassword ? '<i data-feather="eye-off"></i>' : '<i data-feather="eye"></i>';
    
    // Re-render feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  });
  
  wrapper.appendChild(toggleBtn);
  
  // Initial feather render
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

/**
 * Initialize password toggles for all password inputs in a container
 * @param {HTMLElement} container - Container element (default: document)
 */
function initPasswordToggles(container = document) {
  const passwordInputs = container.querySelectorAll('input[type="password"]');
  passwordInputs.forEach(input => addPasswordToggle(input));
}

/**
 * Auto-initialize password toggles when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initPasswordToggles());
} else {
  initPasswordToggles();
}

// Watch for dynamically added password inputs
if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          // Check if the node itself is a password input
          if (node.tagName === 'INPUT' && node.type === 'password') {
            addPasswordToggle(node);
          }
          // Check for password inputs within the node
          if (node.querySelectorAll) {
            const passwordInputs = node.querySelectorAll('input[type="password"]');
            passwordInputs.forEach(input => addPasswordToggle(input));
          }
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

console.log('✅ Password toggle utility loaded');
